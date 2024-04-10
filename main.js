function setup() {
  canvas = createCanvas(300, 300);
  canvas.parent('canvas');
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded()
{
  console.log('Modelo esta cargado');
}


function draw()
{
  image(video,0,0,300,300); // 0,0 coordenadas x y  300 300 el tamaño de mi camara
  classifier.classify(video, gotResult);
}


var previous_result='';


function gotResult(error, results)
{
  if(error)
  {
      console.error(error);
  }
  else
  {
      if((results[0].confidence>0.5)&&(previous_result!=results[0].label))
      {
          console.log(results);
          previous_result=results[0].label;
          var synth=window.speechSynthesis;
          speak_data='Objeto:'+results[0].label;
          var utterThis=new SpeechSynthesisUtterance(speak_data);
          synth.speak(utterThis);


          document.getElementById("result_object_name").innerHTML=results[0].label
          document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(3)
      }
  }
}
