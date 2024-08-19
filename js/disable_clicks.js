

      
        document.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            swal({
                title: "What are you looking for Comrade?",
                    text: "Go and beg for the code stop looking for shortcut  ",
                    icon: "warning"
              });
          });
        
          document.addEventListener('keydown', function(event) {
            if (event.key === 'F12') {
              event.preventDefault();
            }
            // if (event.ctrlKey && event.shiftKey && event.key === 'i' && event.key === 'j' && event.ctrlKey && event.key === 'u' && event.key === 'S' && event.key === 'h' && event.key === 'r' &&
            //                        event.key === 'a' && event.key === 'e' && event.key === 'c' && event.key === 'v' &&
            //                        event.key === 'x' && event.key === 'p') {
            //   event.preventDefault();
            // }
            if (event.ctrlKey && event.shiftKey && event.key === 'C') {
              event.preventDefault();
              swal({
                title: "What are you looking for Comrade?",
                    text: "Go and beg for the code stop looking for shortcut  ",
                    icon: "warning"
              });
            }
            if (event.ctrlKey &&  event.key === 'i') {
              event.preventDefault();
              swal({
                title: "What are you looking for Comrade?",
                    text: "Go and beg for the code stop looking for shortcut  ",
                    icon: "warning"
              });
            }
            if (event.ctrlKey && event.key === 'I') {
              event.preventDefault();
              swal({
                title: "What are you looking for Comrade?",
                    text: "Go and beg for the code stop looking for shortcut  ",
                    icon: "warning"
              });
            }
            if (event.ctrlKey && event.key === 'u' || event.ctrlKey && event.key === 's' || event.ctrlKey && event.key === 'S' || event.ctrlKey && event.key === 'U') {
                event.preventDefault();
                swal({
                    title: "What are you looking for Comrade?",
                    text: "Go and beg for the code stop looking for shortcut  ",
                    icon: "warning"
                  });
              }
          });
          