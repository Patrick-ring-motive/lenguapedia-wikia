globalThis.Q = U => {
  try {
    return U();
  } catch (e) {
    return undefined;
  }
};

void async function LinkResolver() {

  const hostProxy = window.location.host;
  let LinkResloverScript = document.currentScript || document.querySelector('[host-list]');
  const hostList = JSON.parse(atob(LinkResloverScript.getAttribute('host-list')));
  const hostList_length = hostList.length;
  let hostListQuery = 'hostListQuery';

  let apiHostList = ['api.lenguapedia.org', 'lenguapedia-api.vercel.app', 'lenguapedia-api.weblet.repl.co'];
  let apiHost = undefined;

  for (let i = 0; i < apiHostList.length; i++) {
    try {

      let apiResponse = await jsonpFetch('https://' + apiHostList[i] + '/jsonp/https://en.wikipedia.org');
      if (apiResponse) {
        apiHost = apiHostList[i];
        break;
      }

    } catch (e) {
      console.log(e);
      continue;
    }
  }

  if (!apiHost) {
    apiHost = 'api.lenguapedia.org';
  }

  setInterval(async function() {
    const the = {};
    let relativeLinks = document.querySelectorAll('[href^="/"],[href^="./"],[href^="../"]');
    const relativeLinks_length = relativeLinks.length;
    for (let i = 0; i < relativeLinks_length; i++) {
      try {

        relativeLinks[i].setAttribute('href', relativeLinks[i].href);

      } catch (e) {
        continue;
      }
    }
    let relativeSrc = document.querySelectorAll('[src^="/"],[src^="./"],[src^="../"]');
    const relativeSrc_length = relativeSrc.length;
    for (let i = 0; i < relativeSrc_length; i++) {
      try {

        relativeSrc[i].setAttribute('src', relativeSrc[i].src);

      } catch (e) {
        continue;
      }
    }

    hostListQuery = 'hostListQuery';
    for (let i = 0; i < hostList_length; i++) {
      if (hostList[i] == hostProxy) {
        continue;
      }
      hostListQuery = hostListQuery + ',' + `a[href*="/` + hostList[i] + `"]`;
      hostListQuery = hostListQuery + ',' + `a[href*="/www.` + hostList[i] + `"]`;
    }
    const href_list = document.querySelectorAll(hostListQuery);
    const href_list_length = href_list.length;

    for (let i = 0; i < hostList_length; i++) {
      for (let x = 0; x < href_list_length; x++) {
        try {
          if (hostList[i] == hostProxy) {
            continue;
          }
          href_list[x].href = href_list[x].href.replaceAll(hostList[i], hostProxy);
        } catch (e) {
          continue;
        }
      }
    }

    hostListQuery = 'hostListQuery';
    for (let i = 0; i < hostList_length; i++) {
      if (hostList[i] == hostProxy) {
        continue;
      }
      hostListQuery = hostListQuery + ',' + `[src*="/` + hostList[i] + `"]`;
      hostListQuery = hostListQuery + ',' + `[src*="/www.` + hostList[i] + `"]`;
    }
    const src_list = document.querySelectorAll(hostListQuery);
    const src_list_length = src_list.length;

    for (let i = 0; i < hostList_length; i++) {
      for (let x = 0; x < src_list_length; x++) {
        try {
          if (hostList[i] == hostProxy) {
            continue;
          }
          src_list[x].src = src_list[x].src.replaceAll(hostList[i], hostProxy);
        } catch (e) {
          continue;
        }
      }
    }

    hostListQuery = 'hostListQuery';
    for (let i = 0; i < hostList_length; i++) {
      if (hostList[i] == window.location.host) {
        continue;
      }
      hostListQuery = hostListQuery + ',' + `[data-src*="/` + hostList[i] + `"]`;
      hostListQuery = hostListQuery + ',' + `[data-src*="/www.` + hostList[i] + `"]`;
    }
    const data_src_list = document.querySelectorAll(hostListQuery);
    const data_src_list_length = data_src_list.length;

    for (let i = 0; i < hostList_length; i++) {
      for (let x = 0; x < data_src_list_length; x++) {
        try {
          if (hostList[i] == hostProxy) {
            continue;
          }
          data_src_list[x].setAttribute('data-src', data_src_list[x].getAttribute('data-src').replaceAll(hostList[i], hostProxy));
        } catch (e) {
          continue;
        }
      }
    }

    hostListQuery = 'hostListQuery';
    for (let i = 0; i < hostList_length; i++) {
      if (hostList[i] == hostProxy) {
        continue;
      }
      hostListQuery = hostListQuery + ',' + `[style*="/` + hostList[i] + `"]`;
      hostListQuery = hostListQuery + ',' + `[style*="/www.` + hostList[i] + `"]`;
    }
    const style_list = document.querySelectorAll(hostListQuery);
    const style_list_length = style_list.length;

    for (let i = 0; i < hostList_length; i++) {
      for (let x = 0; x < style_list_length; x++) {
        try {
          if (hostList[i] == hostProxy) {
            continue;
          }
          style_list[x].setAttribute('style', style_list[x].getAttribute('style').replaceAll('/' + hostList[i], '/' + hostProxy));

        } catch (e) {
          continue;
        }
      }
    }

    let hrefHttp = document.querySelectorAll('[href^="http://"]');
    const hrefHttp_length = hrefHttp.length;
    for (let i = 0; i < hrefHttp_length; i++) {
      try {
        hrefHttp[i].setAttribute('href', hrefHttp[i].replace('http://', 'https://'));
      } catch (e) {
        continue;
      }
    }

    let srcHttp = document.querySelectorAll('[src^="http://"]');
    const srcHttp_length = srcHttp.length;
    for (let i = 0; i < srcHttp_length; i++) {
      try {
        srcHttp[i].setAttribute('src', srcHttp[i].replace('http://', 'https://'));
      } catch (e) {
        continue;
      }
    }

    let hrefStatic = document.querySelectorAll('[href^="https://static.wikia.nocookie.net"]');
    const hrefStatic_length = hrefStatic.length;
    for (let i = 0; i < hrefStatic_length; i++) {
      try {
        let char = '?';
        let original = hrefStatic[i].href;
        let rewrite = 'https://' + apiHost + '/corsFetchStyles/' + original
        if (original.includes('?')) {
          char = '&';
        }
        hrefStatic[i].setAttribute('href', rewrite + char + 'host=' + window.location.host);
      } catch (e) {
        continue;
      }
    }

    let srcStatic =
      document.querySelectorAll('[src^="https://static.wikia.nocookie.net"]')

    const srcStatic_length = srcStatic.length;
    for (let i = 0; i < srcStatic_length; i++) {
      try {
        let char = '?';
        let original = srcStatic[i].src;
        let rewrite = 'https://' + apiHost + '/corsFetchStyles/' + original
        if (original.includes('?')) {
          char = '&';
        }
        srcStatic[i].setAttribute('src', rewrite + char + 'host=' + window.location.host);
        srcStatic[i].removeAttribute('srcset');
      } catch (e) {
        continue;
      }
    }

    the['data-srcStatic'] =
      document.querySelectorAll('[data-src^="https://static.wikia.nocookie.net"]')

    the['data-srcStatic_length'] = the['data-srcStatic'].length;
    for (let i = 0; i < the['data-srcStatic_length']; i++) {
      try {
        let char = '?';
        let original = the['data-srcStatic'][i].getAttribute('data-src');
        let rewrite = 'https://' + apiHost + '/corsFetchStyles/' + original
        if (original.includes('?')) {
          char = '&';
        }
        the['data-srcStatic'][i].setAttribute('data-src', rewrite + char + 'host=' + window.location.host);
        the['data-srcStatic'][i].setAttribute('src', the['data-srcStatic'][i].getAttribute('data-src'));
        the['data-srcStatic'][i].removeAttribute('class');
      } catch (e) {
        continue;
      }
    }
    delete(the['data-srcStatic_length']);
    delete(the['data-srcStatic']);

    let wikidomain = Q(U => document.querySelector('meta[name="twitter:url"]')
        .getAttribute('content').split('/')[2]) ||
      Q(U => document.querySelector('meta[name="og:title "]')
        .getAttribute('content').split('/')[2]) ||
      'minecraft.fandom.com';
    let hrefLink = document.querySelectorAll('link[href^="https://' + window.location.host + '"]:not(link[href*="fandom-block"])');
    const hrefLink_length = hrefLink.length;
    for (let i = 0; i < hrefLink_length; i++) {
      try {
        hrefLink[i].setAttribute('href', 'https://' + apiHost + '/corsFetch/' + hrefLink[i].href.replace(window.location.host, wikidomain));
      } catch (e) {
        continue;
      }
    }
  }, 100);

}?.();

async function jsonpFetch(url) {

  let jsonpid = 'jsonp-id:' + new Date().getTime();
  let jscr = document.createElement('script');

  jscr.promise = new Promise(function(resolve, reject) {
    jscr.resolve = resolve;
    jscr.reject = reject;
  });
  jscr.setAttribute('jsonp-id', jsonpid);
  jscr.onload = function() {
    let j = document.querySelector('[jsonp-id="' + jsonpid + '"]');

    j.resolve();
  };
  jscr.onerror = function() {
    let j = document.querySelector('[jsonp-id="' + jsonpid + '"]');

    j.reject();
  };
  jscr.src = url;
  document.firstElementChild.appendChild(jscr);
  await jscr.promise;

  return jscr.getAttribute('response-body');

}
