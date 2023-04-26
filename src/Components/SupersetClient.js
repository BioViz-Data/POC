import axios from 'axios';

class SupersetClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }


async login(username, password) {
    try {
      const response = await this.axiosInstance.post('/api/v1/security/login', {
        username,
        password,
        provider: 'db',
        refresh: true,
      });
  
      if (response.status === 200 && response.data.access_token) {
        const accessToken = response.data.access_token;
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        return true;
      } else {
        console.error('Unexpected response from Superset:', response);
        return false;
      }
    } catch (error) {
      console.error('Error logging into Superset:', error.response ? error.response.data : error);
      return false;
    }
  }


  async createChart(data, chartType) {
    // Prepare data for Superset API
    // Vamos ter que mudar essa parte um pouco mais para tipos diferentes de graficos
    const columns = Object.keys(data[0]);
    const values = data.map((row) => Object.values(row));

    const preparedData = {
        chartType: chartType,
        columns: columns,
        values: values,
    };

    try {
      const response = await this.axiosInstance.post('/api/v1/chart/', preparedData);
      return response.data.url;
    } catch (error) {
      console.error('Error generating chart:', error);
      return '';
    }
  }
}

export default SupersetClient;
