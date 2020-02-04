function initializeTracking() {
  function injectGTM() {
    if (window.__gtm) {
      return;
    }

    window.__gtm = window.__gtm || {};

    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TTW243B');
  }

  function injectOptimize() {
    if (window.__optimize) {
      return;
    }

    window.__optimize = window.__optimize || {};

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-62115237-2', 'auto');
    ga('require', 'GTM-TTW243B');
  }
  
  
  setTimeout(() => {
    injectGTM();
    injectOptimize();
  }, 2000)
}