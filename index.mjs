/** 
Root Fallback
<style>
*{display:none;}
</style>
<script>
void async function(){

let root=await fetch('/_root');
let homePage=await root.text();

document.write(homePage);

}();
</script>
*/
//import fetch from 'node-fetch';
import http from 'http';
import {
  addCorsHeaders
} from './modules/cors-headers.mjs';
import {
  normalizeRequest,
  mapResHeaders,
  applyResponse
} from './modules/http-fetch.mjs';
import maintain from './modules/auto-maintain.mjs';
import {
  availReq,
  availRes
} from './modules/availability.mjs';
import {
  serverRequestResponse
} from './server.mjs';
import './modules/serverlessCache.mjs';

process.on('uncaughtException', e => console.log(e));

let server = http.createServer(availReq(onRequest));

server.listen(3000);
maintain(server);

async function onRequest(req, res) {
  lazyTimeout(res, 5000);
  res = availRes(res);
  // const cacheKey=serverlessCache.generateCacheKey(req);
  // const cacheVal=serverlessCache.match(cacheKey);
  //if(cacheVal){return await applyResponse(res,cacheVal);}

  let reqDTO = await normalizeRequest(req);

  let resDTO = await serverRequestResponse(reqDTO);
  // if((!resDTO.status)||((resDTO.status>199)&&(resDTO.status<300))){
  // serverlessCache.put(cacheKey,resDTO);
  // }
  return await applyResponse(res, resDTO);

}

function lazyTimeout(res, ms) {
  try {
    setTimeout(() => {
      try {
        res.statusCode = 504;
        return res.end('');
      } catch (e) {
        console.log(e);
      }
    }, ms);
  } catch (e) {
    console.log(e);
  }
}
