console.log('i am on the line');

// console.log('document.URL : ', document.URL)

// const JWT='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU1NjkxNzExLCJleHAiOjE3NTU2OTUzMTF9.AVlmKacFULj1a11OyCFb7CCn6eTvFJjPCuLvv8xJI0E'

// const getData = async (url) => {
//     try {

//         const options = {
//             method: "GET",
//             credentials: "include"
//         }

//         // headers: {
//         //         Authorization : `Bearer ${JWT}`
//         //     }

//         // const request = new Request(url);
//         const request = new Request(url, options);
//         console.log('request.credentials : ', request.credentials)
//         const response = await fetch(request);

//         console.log('status :', response.status);
//         console.log('response : ', response);

//         if (!response.ok) {
//             console.log('The response did not go smoothly');
//             return;
//         }

//         const text = await response.text(); 
//         console.log('raw response body :', text);

//         let result;
//         try {
//             result = JSON.parse(text);
//         } catch (jsonErr) {
//             console.error('Response was not valid JSON:', jsonErr);
//             return;
//         }

//         console.log('parsed result : ', result);
//         return result;

//     } catch (err) {
//         console.error('err occurred, err :', err);
//     }
// }

// // getData('http://localhost:5001')




// window.getData = getData;