
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, Download, Eye } from 'lucide-react';
import { legalComplaintService } from '@/lib/legalComplaintService';
import { caseDeliverableService } from '@/lib/caseDeliverableService';
import { pdfService } from '@/lib/pdfService';
import { caseSchemaService } from '@/lib/caseSchemaService';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CaseDocumentRenderer from '@/components/CaseDocumentRenderer';
import { useToast } from '@/components/ui/use-toast';

const LegalComplaintClientDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [intakes, setIntakes] = useState([]);
  const [deliverables, setDeliverables] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        // Fetch Intakes
        const { data: intakeData } = await supabase
          .from('legal_complaint_intakes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (intakeData) {
           setIntakes(intakeData);
           
           // Fetch associated deliverables
           const { data: deliverableData } = await supabase
             .from('case_deliverables')
             .select('*')
             .in('intake_id', intakeData.map(i => i.id));
             
           const delMap = {};
           deliverableData?.forEach(d => { delMap[d.intake_id] = d; });
           setDeliverables(delMap);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [user]);

  const handleDownloadPdf = async (deliverable) => {
    if (deliverable.file_url) {
      window.open(deliverable.file_url, '_blank');
    } else if (deliverable.case_schema) {
      // Generate on the fly if file missing but schema exists
       try {
        toast({ title: "Generating PDF..." });
        const blob = await pdfService.generateCasePDFFromSchema(deliverable.case_schema);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${deliverable.case_schema.case_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
       } catch (e) {
         console.error(e);
       }
    }
  };

  const handleDownloadJson = (schema) => {
    caseSchemaService.exportSchemaAsJSON(schema);
  };

  if (loading) return <div className="p-8 text-center text-[#EBE8E3]">Loading your cases...</div>;

  return (
    <div className="min-h-screen bg-[#0A1612] text-[#EBE8E3] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-[#E0A995] mb-8">My Legal Cases</h1>
        
        {intakes.length === 0 ? (
          <div className="bg-[#13251E]/50 border border-dashed border-[#E0A995]/20 p-12 text-center rounded-xl">
            <p className="text-[#A8B3AF] mb-4">You haven't submitted any cases yet.</p>
            <Button onClick={() => window.location.href='/legal-complaint-intake'} className="bg-[#E0A995] text-[#0A1612]">
              Start New Case
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {intakes.map(intake => {
              const deliverable = deliverables[intake.id];
              const isDelivered = deliverable?.delivery_status === 'delivered';
              
              return (
              <div key={intake.id} className="bg-[#0F1C15] border border-[#E0A995]/10 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#E0A995]" />
                      {intake.reference_id}
                    </h3>
                    <p className="text-sm text-[#A8B3AF]">Created: {new Date(intake.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      isDelivered ? 'bg-green-500/20 text-green-500' : 'bg-[#E0A995]/20 text-[#E0A995]'
                    }`}>
                      {isDelivered ? 'Delivered' : intake.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                  <div className="bg-[#13251E] p-3 rounded">
                    <span className="text-[#A8B3AF] block text-xs uppercase">Issue Type</span>
                    {intake.issue_type}
                  </div>
                  <div className="bg-[#13251E] p-3 rounded">
                    <span className="text-[#A8B3AF] block text-xs uppercase">Complaint Against</span>
                    {intake.complaint_against}
                  </div>
                  <div className="bg-[#13251E] p-3 rounded">
                     {isDelivered ? (
                       <>
                         <span className="text-[#A8B3AF] block text-xs uppercase">Delivered On</span>
                         {new Date(deliverable.delivered_at).toLocaleDateString()}
                       </>
                     ) : (
                       <>
                         <span className="text-[#A8B3AF] block text-xs uppercase">Est. Delivery</span>
                         {legalComplaintService.getStartDeliveryEstimate(intake.pricing_tier)}
                       </>
                     )}
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-[#E0A995]/10 pt-4">
                  <div className="flex-1">
                     <div className="flex items-center gap-2 text-sm text-[#A8B3AF]">
                       <div className={`w-2 h-2 rounded-full ${intake.status === 'submitted' ? 'bg-blue-500' : 'bg-gray-500'}`} /> Submitted
                       <div className="w-8 h-px bg-gray-700" />
                       <div className={`w-2 h-2 rounded-full ${isDelivered ? 'bg-green-500' : 'bg-gray-500'}`} /> Delivery
                     </div>
                  </div>
                  
                  {isDelivered && deliverable && (
                    <div className="flex gap-2">
                       {deliverable.case_schema && (
                         <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="border-[#E0A995]/50 text-[#E0A995]">
                                <Eye className="w-4 h-4 mr-2" /> View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[850px] max-h-[90vh] overflow-y-auto bg-white text-black p-0">
                               <CaseDocumentRenderer schema={deliverable.case_schema} />
                            </DialogContent>
                         </Dialog>
                       )}
                       
                       <Button 
                         variant="default" 
                         onClick={() => handleDownloadPdf(deliverable)}
                         className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89]"
                       >
                         <Download className="w-4 h-4 mr-2" /> Download PDF
                       </Button>
                    </div>
                  )}
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalComplaintClientDashboard;
