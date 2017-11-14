(function (doc, win) {
          var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              if(clientWidth>=750){
                    docEl.style.fontSize = '30px';
                }else{
              docEl.style.fontSize = 16* (clientWidth / 375) + 'px';
            }
          };

          if (!doc.addEventListener) return;
          win.addEventListener(resizeEvt, recalc, false);
          doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);

  var test="v2";
  var test_="paizhewan";
