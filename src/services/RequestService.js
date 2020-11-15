//abhishek360

import axios from 'axios';

export default class RequestService {
  constructor(route = '', domain = '') {
    let uri = "https://api.unsplash.com" || '';

    switch (domain) {
      case "UNSPLASH":
        uri = "https://api.unsplash.com" || '';
        this.url = `${uri}/${route}`;
        break;

      default:
        uri = "https://api.unsplash.com" || '';
        this.url = `${uri}/${route}`;
    }

    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  get = async (id = '') => {
      axios.defaults.headers['Authorization'] = "Client-ID wtjZvh1kGeUwYjSwhOF-hm7liHuumEqBWRVEkTDx1MY";

      try {
        const res = await axios({ methods: 'GET', url: `${this.url}${id}` });
        return res.data;
      } catch (error) {
        return error.response.data;
      }
  };
}
