if(!globalThis.serverlessCache){globalThis.serverlessCache=Object.create(null);}


globalThis.serverlessCache.put=function(key,val){
  globalThis.serverlessCache[key]=val;
}
globalThis.serverlessCache.putClone=function(key,val){
  globalThis.serverlessCache[key]=val.clone();
}


globalThis.serverlessCache.match=function(key){
  return globalThis.serverlessCache[key];
}


globalThis.serverlessCache.matchClone=function(key){
  return globalThis.serverlessCache[key]?.clone?.();
}

globalThis.serverlessCache.generateCacheKey=function(req){

let cacheHead = JSON.parse(JSON.stringify(req.headers).toLowerCase());
  delete(cacheHead['cookie']);
  delete(cacheHead['user-agent']);
  delete(cacheHead['referer']);
  delete(cacheHead['accept']);
  delete(cacheHead['x-forwarded-for']);
  delete(cacheHead['sec-ch-ua']);
  delete(cacheHead['sec-ch-ua-mobile']);
  delete(cacheHead['sec-ch-ua-platform']);
  delete(cacheHead['if-modified-since']);
   return req.url.split('version=')[0]+JSON.stringify(cacheHead);
}