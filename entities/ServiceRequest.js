import { supabase } from '@/lib/supabase';

export class ServiceRequest {
  constructor(data) {
    this.id = data?.id;
    this.device_type = data?.device_type;
    this.device_type_display = data?.device_type_display;
    this.brand = data?.brand;
    this.issue = data?.issue;
    this.region = data?.region;
    this.region_display = data?.region_display;
    this.phone = data?.phone;
    this.source = data?.source || 'web';
    this.whatsapp_sent = data?.whatsapp_sent || false;
    this.status = data?.status || 'new';
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
  }

  static async create(requestData) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .insert([{
          device_type: requestData.device_type,
          device_type_display: requestData.device_type_display,
          brand: requestData.brand,
          issue: requestData.issue,
          region: requestData.region,
          region_display: requestData.region_display,
          phone: requestData.phone,
          source: requestData.source || 'web',
          whatsapp_sent: requestData.whatsapp_sent || false,
          status: requestData.status || 'new'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating service request:', error);
        throw error;
      }

      return new ServiceRequest(data);
    } catch (error) {
      console.error('ServiceRequest.create error:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error finding service request:', error);
        throw error;
      }

      return data ? new ServiceRequest(data) : null;
    } catch (error) {
      console.error('ServiceRequest.findById error:', error);
      throw error;
    }
  }

  static async findAll(filters = {}) {
    try {
      let query = supabase.from('service_requests').select('*');

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.region) {
        query = query.eq('region', filters.region);
      }
      if (filters.device_type) {
        query = query.eq('device_type', filters.device_type);
      }

      // Order by created_at descending
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('Error finding service requests:', error);
        throw error;
      }

      return data.map(item => new ServiceRequest(item));
    } catch (error) {
      console.error('ServiceRequest.findAll error:', error);
      throw error;
    }
  }

  async update(updateData) {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', this.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating service request:', error);
        throw error;
      }

      // Update current instance
      Object.assign(this, data);
      return this;
    } catch (error) {
      console.error('ServiceRequest.update error:', error);
      throw error;
    }
  }

  async delete() {
    try {
      const { error } = await supabase
        .from('service_requests')
        .delete()
        .eq('id', this.id);

      if (error) {
        console.error('Error deleting service request:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('ServiceRequest.delete error:', error);
      throw error;
    }
  }

  // Helper methods
  isNew() {
    return this.status === 'new';
  }

  isInProgress() {
    return this.status === 'in_progress';
  }

  isCompleted() {
    return this.status === 'completed';
  }

  isCancelled() {
    return this.status === 'cancelled';
  }

  getStatusDisplay() {
    const statusMap = {
      'new': 'Yeni Talep',
      'in_progress': 'İşlemde',
      'completed': 'Tamamlandı',
      'cancelled': 'İptal Edildi'
    };
    return statusMap[this.status] || this.status;
  }

  getFormattedCreatedAt() {
    if (!this.created_at) return '';
    return new Date(this.created_at).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}