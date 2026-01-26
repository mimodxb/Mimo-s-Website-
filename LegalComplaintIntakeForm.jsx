
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, Upload, AlertCircle, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { fileUploadService } from '@/lib/fileUploadService';
import { legalComplaintService } from '@/lib/legalComplaintService';
import { messagingService } from '@/lib/messagingService';
import PricingTierSelector from './PricingTierSelector';
import { supabase } from '@/lib/customSupabaseClient';
import { mapIntakeFormToSchema } from '@/lib/intakeToSchemaMapper';
import { caseDeliverableService } from '@/lib/caseDeliverableService';

const LegalComplaintIntakeForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    reference_id: '',
    full_name: '',
    email: '',
    country: '',
    response_time: 'standard',
    complaint_against: '',
    issue_type: '',
    issue_start_date: '',
    deadlines: '',
    situation_description: '',
    contacted_party: false,
    contact_method: [],
    party_response: '',
    document_links: '',
    documents: [],
    file_urls: [],
    desired_outcome: '',
    pricing_tier: '',
    // Agreements
    agree_terms: false,
    agree_payment_terms: false,
    agree_not_legal_advice: false,
    confirm_accuracy: false
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ 
        ...prev, 
        email: user.email,
        full_name: user.user_metadata?.full_name || ''
      }));
    }
    const saved = localStorage.getItem('legalIntakeDraft');
    if (saved) {
      try {
        setFormData(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch(e) {}
    } else {
      setFormData(prev => ({ ...prev, reference_id: legalComplaintService.generateIntakeReference() }));
    }
  }, [user]);

  const saveDraft = () => {
    localStorage.setItem('legalIntakeDraft', JSON.stringify(formData));
    toast({ title: "Draft Saved", description: "Your progress has been saved locally." });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...selectedFiles.map(f => f.name)]
    }));
  };

  const validateStep = (step) => {
    if (step === 1) return formData.full_name && formData.email && formData.country;
    if (step === 2) return formData.complaint_against && formData.issue_type && formData.issue_start_date;
    if (step === 3) return formData.situation_description.length >= 50;
    if (step === 4) return true;
    if (step === 5) return formData.desired_outcome && formData.pricing_tier && formData.agree_terms && formData.agree_payment_terms && formData.agree_not_legal_advice && formData.confirm_accuracy;
    return false;
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    setLoading(true);

    try {
      // 1. Upload Files
      let uploadedUrls = formData.file_urls || [];
      if (files.length > 0) {
        setUploading(true);
        const { uploadedUrls: newUrls, errors } = await fileUploadService.uploadIntakeFiles(files, formData.reference_id);
        if (errors.length > 0) toast({ variant: "destructive", title: "Upload Errors", description: errors.join(', ') });
        uploadedUrls = [...uploadedUrls, ...newUrls];
        setUploading(false);
      }

      // 2. Submit Intake Data
      const finalData = {
        ...formData,
        user_id: user?.id,
        file_urls: uploadedUrls,
        status: 'submitted'
      };

      const { success, error, data: intakeData } = await legalComplaintService.submitIntakeForm(finalData);

      if (success) {
        localStorage.removeItem('legalIntakeDraft');
        
        // 3. Setup Conversation
        let conversationId = null;
        try {
          const conversation = await messagingService.createConversation(intakeData.id, {
            id: user?.id,
            email: formData.email,
            name: formData.full_name,
            reference: formData.reference_id
          });
          conversationId = conversation.id;
          
          supabase.functions.invoke('send-message-notification', { 
            body: {
              recipientEmail: formData.email,
              senderName: "Mimo Support",
              conversationLink: `${window.location.origin}/client-messaging/${conversation.id}`,
              emailType: 'conversation_created',
              intakeReference: formData.reference_id
            } 
          });
        } catch (msgError) {
          console.error("Messaging setup failed:", msgError);
        }

        // 4. Create Initial Case Deliverable with Schema
        try {
          const initialSchema = mapIntakeFormToSchema(finalData);
          initialSchema.case_id = formData.reference_id;
          
          await caseDeliverableService.createCaseDeliverable(intakeData.id, conversationId, {
            case_title: `Case ${formData.reference_id}`,
            case_content: "Initial draft generated from intake.",
            delivery_status: "draft",
            case_schema: initialSchema
          });
        } catch (schemaError) {
           console.error("Schema creation failed:", schemaError);
        }

        supabase.functions.invoke('send-legal-intake-email', { body: finalData });
        
        toast({ title: "Submission Successful!", description: "We have received your intake form." });
        navigate('/mimo-collective/legal-complaint-service?success=true');
      } else {
        throw new Error(error);
      }

    } catch (err) {
      toast({ variant: "destructive", title: "Submission Failed", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, title: "Basic Info" },
    { num: 2, title: "Case Overview" },
    { num: 3, title: "Details" },
    { num: 4, title: "Evidence" },
    { num: 5, title: "Review & Plan" }
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-serif font-bold text-[#E0A995]">Legal Complaint Intake</h1>
            <Button variant="ghost" onClick={saveDraft} className="text-[#A8B3AF]">
              <Save className="w-4 h-4 mr-2" /> Save Draft
            </Button>
          </div>
          <div className="h-2 bg-[#13251E] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#E0A995]" 
              initial={{ width: 0 }} 
              animate={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-[#A8B3AF]">
            {steps.map(s => (
              <span key={s.num} className={currentStep >= s.num ? "text-[#E0A995]" : ""}>{s.title}</span>
            ))}
          </div>
        </div>

        <div className="bg-[#0F1C15]/50 backdrop-blur-md border border-[#E0A995]/20 rounded-xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Section A: Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country of Residence *</label>
                      <select name="country" value={formData.country} onChange={handleChange} className="w-full bg-[#0A1612] border border-[#333] rounded-md px-3 py-2 text-white h-12">
                        <option value="">Select Country</option>
                        <option value="Azerbaijan">Azerbaijan</option>
                        <option value="UAE">UAE</option>
                        <option value="UK">UK</option>
                        <option value="USA">USA</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Section B: Case Overview</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Complaint Against (Company/Person) *</label>
                    <Input name="complaint_against" value={formData.complaint_against} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Issue Type *</label>
                      <select name="issue_type" value={formData.issue_type} onChange={handleChange} className="w-full bg-[#0A1612] border border-[#333] rounded-md px-3 py-2 text-white h-12">
                        <option value="">Select Type</option>
                        <option value="Service Failure">Service Failure</option>
                        <option value="Product Defect">Product Defect</option>
                        <option value="Billing Dispute">Billing Dispute</option>
                        <option value="Contract Breach">Contract Breach</option>
                        <option value="Harassment">Harassment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Issue Start Date *</label>
                      <Input name="issue_start_date" type="date" value={formData.issue_start_date} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Section C: What Happened?</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Detailed Description * (Min 50 chars)</label>
                    <Textarea 
                      name="situation_description" 
                      value={formData.situation_description} 
                      onChange={handleChange} 
                      className="min-h-[150px]"
                      placeholder="Please describe the events chronologically..."
                    />
                    <div className="text-xs text-right mt-1 text-[#A8B3AF]">{formData.situation_description.length} chars</div>
                  </div>
                  
                  <div className="bg-[#13251E] p-4 rounded-lg">
                    <label className="flex items-center gap-2 mb-4">
                      <Checkbox 
                        checked={formData.contacted_party} 
                        onCheckedChange={(c) => setFormData({...formData, contacted_party: c})} 
                      />
                      Have you already contacted the other party?
                    </label>

                    {formData.contacted_party && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Their Response</label>
                          <Textarea name="party_response" value={formData.party_response} onChange={handleChange} placeholder="What did they say?" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Section D: Evidence & Documents</h2>
                  <div className="border-2 border-dashed border-[#E0A995]/30 rounded-xl p-8 text-center bg-[#13251E]/50">
                    <input type="file" id="file-upload" multiple className="hidden" onChange={handleFileUpload} />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-12 h-12 text-[#E0A995] mb-2" />
                      <span className="text-lg font-bold">Click to Upload Files</span>
                    </label>
                  </div>
                  
                  {files.length > 0 && (
                     <div className="bg-[#13251E] p-4 rounded-lg">
                       <h4 className="font-bold mb-2">Selected Files:</h4>
                       <ul className="list-disc list-inside text-sm text-[#A8B3AF]">
                         {files.map((f, i) => <li key={i}>{f.name}</li>)}
                       </ul>
                     </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">External Links</label>
                    <Textarea name="document_links" value={formData.document_links} onChange={handleChange} placeholder="Paste links here..." />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-4">Section E: Outcome & Plan</h2>
                  <div>
                    <label className="block text-sm font-medium mb-2">Desired Outcome *</label>
                    <Textarea 
                      name="desired_outcome" 
                      value={formData.desired_outcome} 
                      onChange={handleChange} 
                      placeholder="What specific result are you seeking? (e.g. Refund, Apology, Compensation)"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4 text-[#E0A995]">Select Service Tier *</h3>
                    <PricingTierSelector 
                      selectedTier={formData.pricing_tier} 
                      onSelect={(tier) => setFormData({...formData, pricing_tier: tier})}
                      showUrgentOption={true}
                    />
                  </div>

                  <div className="bg-[#13251E] p-6 rounded-lg border border-[#E0A995]/20 mt-6 space-y-4">
                     <h3 className="text-[#E0A995] font-bold text-lg mb-4">Consent & Agreement</h3>
                     
                     <div className="flex items-start gap-3">
                       <Checkbox 
                         id="terms"
                         checked={formData.agree_terms} 
                         onCheckedChange={(c) => setFormData({...formData, agree_terms: c})} 
                       />
                       <label htmlFor="terms" className="text-sm cursor-pointer">
                         I have read and agree to the <Link to="/terms-and-conditions" target="_blank" className="text-[#E0A995] underline">Terms & Conditions</Link>.
                       </label>
                     </div>

                     <div className="flex items-start gap-3">
                       <Checkbox 
                         id="payment"
                         checked={formData.agree_payment_terms} 
                         onCheckedChange={(c) => setFormData({...formData, agree_payment_terms: c})} 
                       />
                       <label htmlFor="payment" className="text-sm cursor-pointer">
                         I have read and agree to the <Link to="/payment-terms" target="_blank" className="text-[#E0A995] underline">Payment Terms</Link>.
                       </label>
                     </div>

                     <div className="flex items-start gap-3">
                       <Checkbox 
                         id="not_legal"
                         checked={formData.agree_not_legal_advice} 
                         onCheckedChange={(c) => setFormData({...formData, agree_not_legal_advice: c})} 
                       />
                       <label htmlFor="not_legal" className="text-sm cursor-pointer">
                         I understand this service provides <strong>documentation support only</strong> and does <strong>not</strong> constitute legal advice or representation.
                       </label>
                     </div>

                     <div className="flex items-start gap-3">
                       <Checkbox 
                         id="accuracy"
                         checked={formData.confirm_accuracy} 
                         onCheckedChange={(c) => setFormData({...formData, confirm_accuracy: c})} 
                       />
                       <label htmlFor="accuracy" className="text-sm cursor-pointer">
                         I confirm that all information and evidence provided is accurate and truthful.
                       </label>
                     </div>
                  </div>
                  
                  <p className="text-xs text-[#A8B3AF] mt-2 italic">
                    By submitting this form, you agree to our Terms & Conditions and Payment Terms.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-[#E0A995]/10">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="border-[#E0A995]/30 text-[#EBE8E3]"
            >
              Back
            </Button>

            {currentStep < 5 ? (
              <Button 
                onClick={() => {
                  if(validateStep(currentStep)) setCurrentStep(prev => prev + 1);
                  else toast({ variant: "destructive", title: "Incomplete", description: "Please fill required fields." });
                }}
                className="bg-[#E0A995] text-[#0A1612]"
              >
                Next Step <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={loading || !formData.agree_terms || !formData.agree_payment_terms || !formData.agree_not_legal_advice || !formData.confirm_accuracy || !formData.pricing_tier}
                className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89] px-8 py-6 text-lg"
              >
                {loading || uploading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                Submit Case
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalComplaintIntakeForm;
