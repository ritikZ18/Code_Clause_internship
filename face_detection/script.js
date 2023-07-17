const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
   canvas.id = 'canvas-edit'
    
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100000000000)
})





// this chunk of code was for more functionalities 





// const video = document.getElementById('video');
// const container = document.createElement('div');
// document.body.appendChild(container);

// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceExpressionNet.loadFromUri('/models')
// ]).then(startVideo);

// function startVideo() {
//   navigator.mediaDevices.getUserMedia({ video: {} })
//     .then(stream => {
//       video.srcObject = stream;
//       video.addEventListener('loadedmetadata', () => {
//         const canvas = faceapi.createCanvasFromMedia(video);
//         container.appendChild(canvas);
//         const displaySize = { width: video.width, height: video.height };
//         faceapi.matchDimensions(canvas, displaySize);
//         requestAnimationFrame(() => draw(canvas, displaySize));
//       });
//     })
//     .catch(err => console.error(err));
// }

// async function draw(canvas, displaySize) {
//   const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//     .withFaceLandmarks()
//     .withFaceExpressions();
//   const resizedDetections = faceapi.resizeResults(detections, displaySize);
//   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//   faceapi.draw.drawDetections(canvas, resizedDetections);
//   faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
//   faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
//   requestAnimationFrame(() => draw(canvas, displaySize));
// }