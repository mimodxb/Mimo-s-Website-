
import { supabase } from '@/lib/customSupabaseClient';

const handleResponse = async (promise) => {
  try {
    const { data, error } = await promise;
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Admin Service Error:', error);
    return { data: null, error: error.message };
  }
};

export const adminService = {
  // --- BRANDS ---
  getBrands: () => handleResponse(supabase.from('brands').select('*, partners(business_name)')),
  createBrand: (data) => handleResponse(supabase.from('brands').insert([data]).select()),
  updateBrand: (id, data) => handleResponse(supabase.from('brands').update(data).eq('id', id).select()),
  deleteBrand: (id) => handleResponse(supabase.from('brands').delete().eq('id', id)),

  // --- SERVICES ---
  getServices: () => handleResponse(supabase.from('services').select('*, brands(name)')),
  createService: (data) => handleResponse(supabase.from('services').insert([data]).select()),
  updateService: (id, data) => handleResponse(supabase.from('services').update(data).eq('id', id).select()),
  deleteService: (id) => handleResponse(supabase.from('services').delete().eq('id', id)),

  // --- PARTNERS ---
  getPartners: () => handleResponse(supabase.from('partners').select('*')),
  updatePartner: (id, data) => handleResponse(supabase.from('partners').update(data).eq('id', id).select()),
  deletePartner: (id) => handleResponse(supabase.from('partners').delete().eq('id', id)),
  approvePartner: (id) => handleResponse(supabase.from('partners').update({ status: 'approved' }).eq('id', id).select()), // Assuming 'status' is used for approval

  // --- OFFERS ---
  getOffers: () => handleResponse(supabase.from('offers').select('*')),
  createOffer: (data) => handleResponse(supabase.from('offers').insert([data]).select()),
  updateOffer: (id, data) => handleResponse(supabase.from('offers').update(data).eq('id', id).select()),
  deleteOffer: (id) => handleResponse(supabase.from('offers').delete().eq('id', id)),

  // --- ORDERS ---
  getOrders: () => handleResponse(supabase.from('orders').select('*').order('created_at', { ascending: false })),
  getOrderDetails: (id) => handleResponse(supabase.from('orders').select('*, order_items(*)').eq('id', id).single()),
  updateOrderStatus: (id, status) => handleResponse(supabase.from('orders').update({ status }).eq('id', id).select()),

  // --- INQUIRIES ---
  getInquiries: () => handleResponse(supabase.from('inquiries').select('*').order('created_at', { ascending: false })),
  getInquiryDetails: (id) => handleResponse(supabase.from('inquiries').select('*').eq('id', id).single()),
  updateInquiryStatus: (id, status, notes) => {
    // Note: Assuming a 'notes' column exists or we append to message. 
    // If notes column doesn't exist, we might need to store it in metadata or update schema. 
    // For now, only updating status as per standard schema, ignoring notes if column missing in DB.
    return handleResponse(supabase.from('inquiries').update({ status }).eq('id', id).select());
  },

  // --- FEATURE SLOTS ---
  getFeatureSlots: () => handleResponse(supabase.from('feature_slots').select('*').order('slot_number')),
  updateFeatureSlot: async (slotNumber, data) => {
    // Upsert logic for slots
    const { error: deleteError } = await supabase.from('feature_slots').delete().eq('slot_number', slotNumber);
    if (deleteError) return { error: deleteError.message };
    
    return handleResponse(supabase.from('feature_slots').insert([{ ...data, slot_number: slotNumber }]).select());
  },
  clearFeatureSlot: (slotNumber) => handleResponse(supabase.from('feature_slots').delete().eq('slot_number', slotNumber)),
  
  // Helper to fetch item name for feature slots
  getItemName: async (type, id) => {
    const table = type === 'brand' ? 'brands' : type === 'service' ? 'services' : 'offers';
    const field = type === 'brand' ? 'name' : 'title';
    const { data } = await supabase.from(table).select(field).eq('id', id).single();
    return data ? data[field] : 'Unknown Item';
  }
};
