 $.fn.toRem = function(){
    return ( parseInt( $(this).css('font-size') ) * 0.0625 );
 } 
 
 let width = $(window).width();
 let height = $(window).height();
 let words = WordCount($('#p').text());
 let trainingData = [];
 const net = new brain.NeuralNetwork();
 $('#size').text('dataFormat('+height+', '+width+', '+words+', "'+$('#p').toRem()+'"),');

 function WordCount(str) {
     return str.split(" ").length;
 }

function scale(value) {
     if (value > 999) return value / 10000;
     else if (value > 99) return value / 100;
     else return value / 1000;
 }
function dataFormat(h, w, words, output) {
    let dataform = {
        input: {
            h: scale(h),
            w: scale(w),
            words: scale(words)
        },
        output: {
        }
    };
    dataform.output[output] = 1;
    return dataform;
 };


 trainingData.push(
     dataFormat(188, 372, 67, "0.8rem"),
     dataFormat(218, 544, 67, "1.2rem"),
     dataFormat(190, 559, 51, "1.2rem"),
     dataFormat(579, 801, 67, "2rem"),
     dataFormat(299, 1044, 67, "2rem"),
     dataFormat(299, 1772, 67, "2.5rem"),
     dataFormat(963, 1920, 67, "3rem"),
     dataFormat(799, 1248, 67, "2.7rem"),
     dataFormat(575, 959, 67, "2rem"),
     dataFormat(379, 724, 67, "1.7rem"),
     dataFormat(327, 402, 67, "0.8rem"),
     dataFormat(483, 574, 67, "1.4rem"),
     dataFormat(250, 1099, 67, "1.7rem"),
     dataFormat(250, 482, 67, "1.2rem"),
     dataFormat(324, 693, 67, "1.4rem"),
     dataFormat(528, 356, 67, "1.1rem"),
 );
 net.train(trainingData);

 var fontS = brain.likely({
     h: scale(height),
     w: scale(width),
     words:scale(67)
 }, net);
 $('body p').css('font-size', fontS);
 window.addEventListener('resize', (event) => {

     let wid = event.target.document.documentElement.clientWidth;
     let hei = event.target.document.documentElement.clientHeight;
     $('#size').text('dataFormat('+hei+', '+wid+', '+words+', "'+$('#p').toRem()+'"),');
     //brain.likely(params); => key
     //net.run(params); => value
     var fontSize = brain.likely({
         h: scale(hei),
         w: scale(wid),
         words: scale(67)
     },net);

     $('body p').css('font-size', fontSize );

 });

