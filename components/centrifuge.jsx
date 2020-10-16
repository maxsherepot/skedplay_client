import Centrifuge from 'centrifuge';
import initAxios from '../lib/initAxios';
import SockJS from 'sockjs-client';

let axios = initAxios();

export default class Centrifugo {
  static instance = null;

  static init() {
    if (this.instance) {
      return this.instance;
    }

    let url = process.env.API_URL
      ? process.env.API_URL
      : process.env.GRAPHQL_BROWSER_URL.replace('/graphql', '');

    this.instance = axios.get(url + '/api/centrifuge-config')
      .then(resp => resp.data)
      .then(function (data) {
        let user = '' + data.user;
        let timestamp = '' + data.timestamp;
        let token = data.token;
        let centrifugeInstance = new Centrifuge(data.url, {
          user: user,
          timestamp: timestamp,
          token: token,
          debug: false,
          sockjs: SockJS
        });

        centrifugeInstance.on('connect', function(context) {
          // console.log('connect', context);
        });

        centrifugeInstance.on('disconnect', function(context) {
          // console.log('disconnect', context);
        });

        centrifugeInstance.connect();

        return centrifugeInstance;
      })
      .catch(res => {
        // console.log(res);
      });

    return this.instance;
  }
}