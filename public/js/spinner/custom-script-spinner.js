function  showSwalSuccess(value) {
        Swal.fire({
            title: value,
            text: 'is the random result.',
            type: 'success',
            button: {
                text: "Continue",
                value: true,
                visible: true,
            }
        })
    }
 function showSwalError(value) {
        Swal.fire({
            title: "Missing Data!",
            text: value,
            icon: 'warning',
            button: {
                text: "Continue",
                value: true,
                visible: true,
            }
        })
    }

$(document).ready(function () {
    let wheelPower = 0;
    let wheelSpinning = false;
    let theWheel = new Winwheel({
        'outerRadius': 160,   // Set outer radius so wheel fits inside the background.
        'textFontSize': 40,    // Set font size as desired.
        'responsive': true,
        'innerRadius': 28,
        'segments':        // Define segments including colour and text.
            [],
        'animation':           // Specify the animation to use.
            {
                'type': 'spinToStop',
                'duration': 20,
                'spins': 1,
                'callbackFinished': alertPrize,
                'callbackSound': playSound,   // Function to call when the tick sound is to be triggered.
                'soundTrigger': 'pin'        // Specify pins are to trigger the sound, the other option is 'segment'.
            },
        'pins':
            {
                'number': 20,   // Number of pins. They space evenly around the wheel.
                'responsive': true
            }
    });

    let audio = new Audio('https://pickrandom.com/files/tools/wheel/tick.mp3');  // Create audio object and load tick.mp3 file.
    var enableSound = true;
    var removeIndicated = false;

    function playSound() {
        if (enableSound) {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        }
    }

    function alertPrize(indicatedSegment) {
/*              $.ajax({
                url: 'Web_services/spinTable/create',
                type: 'post',
                dataType: 'json',
                data: {number:indicatedSegment.text},
                success: function (result) {
                   
                   if(result.type=='success'){
                
 */                    $("#messageshow").html("<strong>Well done!</strong> Last Random Picked: <strong>" + indicatedSegment.text + '</strong>');
                         showSwalSuccess(indicatedSegment.text);
                
               /*      }
                    else{
                        if (result.swal) {
                        Swal.fire(result.swal);
                    }   
                    }
                    ajaxEnd();
                },
                error: function (error) {
                    swal.fire({
                        'icon': 'error',
                        'title': 'Error',
                        'text': 'AJAX ERROR'
                    });
                    ajaxEnd();
                }
            }); */ 

        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
        $("#last_results ol").append('<li>' + datetime + ': <strong>' + indicatedSegment.text + '</strong></li>');

        if (removeIndicated) {
            theWheel.deleteIndicatedSegment();
            theWheel.draw();
        }

        theWheel.stopAnimation(false);
        theWheel.rotationAngle = 0;
        wheelSpinning = false;
    }


    $("#spin_buttons").click(function () {
        startSpin();
    });

    // $("#canvas").click(function () {
    //     startSpin();
    // });
 
    $("#buttonresetwheel").click(function () {
        resetWheel();
    });

    $("#buttonupdatewheel").click(function () {
        updateWheel();
    });

    $('#checkbox_enable_sound').change(function () {
        if ($(this).is(":checked")) {
            enableSound = true;
        } else {
            enableSound = false;
        }
    });

    $('#checkbox_enable_removeIndicated').change(function () {
        if ($(this).is(":checked")) {
            removeIndicated = true;
        } else {
            removeIndicated = false;
        }
    });

    function updateWheel() {
        theWheel.deleteAllSegment();
        var data_load = "";
        $('#myTabSetPanel div').each(function () {
            var $this = $(this);
            if ($this.attr('class').indexOf('active') !== -1) {
                data_load = $(this).find('textarea').val();
            }
        });

        if (data_load != '') {
            //var lines = $("#wheelvalueinput1").val().split("\n");
            var lines = data_load.split("\n");
            for (var i = 0; i < lines.length; i++) {
                // only push this line if it contains a non whitespace character.
                if (/\S/.test(lines[i])) {
                    let vals = $.trim(lines[i]);
                    let newSegment = theWheel.addSegment(); // Add segment
                    newSegment.text = vals;        // Set text and fillStyle using returned
                    newSegment.fillStyle = getRandomColor();         // pointer to the segment object.
                    //theWheel.draw();
                }
            }
            theWheel.draw();
        } else {
            showSwalError('Please input at least 2 values or select another SET have  value!');
        }
    }

    function startSpin() {
        if (wheelSpinning == false) {
            theWheel.animation.spins = 8;
            theWheel.startAnimation();
            wheelSpinning = true;
        }
    }

    function resetWheel() {
        $("#wheelvalueinput1").val("0\n1\n2\n3\n4\n5\n6\n7\n8\n9");
        theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
        theWheel.draw();                // Call draw to render changes to the wheel.
        wheelSpinning = false;
        updateWheel();
    }

    function getRandomColor() {
        var letters = 'ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    resetWheel();
});