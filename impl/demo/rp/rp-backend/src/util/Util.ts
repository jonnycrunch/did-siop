import axios from 'axios';
import { JWT } from 'jose';
import { SIOPResponsePayload } from '@lib/did-siop';

async function doPostCall(data: any, url: string): Promise<any> {
  try {
    const response = await axios.post(url, data);
    console.log('AXIOS RESPONSE: ');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log((error as Error).message, url);
    console.log((error as Error).name);
    console.log((error as Error).stack);
    throw error;
  }
}

function decodePayload( jwt: string ): SIOPResponsePayload {
  const { payload } = JWT.decode(jwt, { complete: true });
  return payload as SIOPResponsePayload;
}

// TODO: load this value from a data store 
function loadNonce(jwt: string): string {
  return decodePayload(jwt).nonce
}

function getIssDid( jwt: string ): string {
  return decodePayload(jwt).iss
}

export {
  doPostCall,
  loadNonce,
  getIssDid
};