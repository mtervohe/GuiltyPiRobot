/*
 * @depends path=/scripts/jquery-2.1.4.min.js
 * @depends path=/scripts/modules/virtualjoystick.js
 */
requirejs(['scripts/modules/jquery-2.1.4.min.js', 'scripts/modules/virtualjoystick.js'], function ($, vjs) {

    //main.js contents
    //Pass a config object to require
    require.config({
        "packages": ["cart", "store"]
    });

    require(["cart", "store", "store/util"],
        function (cart,   store,   util) {
            //use the modules as usual.
    });

        function test() {
            console.log('test function called!')
        }

        var socket;

        function sendSpeech() {
            message = prompt("Enter a message to be spoken by the robot", "");
            socket.emit('fromclient', {commandtype: "speech", text: message});
        }

        var flashlight = false;

        function switchFlash() {
            flashlight = !flashlight;
            socket.emit('fromclient', {commandtype: "flashlight", value: flashlight});
        }

        //the function to set the img's src to the correct location
        function setimgsrc() {
            document.getElementById("mainimg").src = "http://" + window.location.hostname + ":3001/?action=stream";
        }

        //the code that runs once the page is finished loading
        $(function () {
            setimgsrc();

            //creating a socket to send data back to the node.js server
            socket = io.connect(window.location.hostname + ':3000');
        });


        /// joystick code:

        //creating a joystick
        var joystick = new VirtualJoystick({
            container: document.getElementById('container'),
            mouseSupport: true,
            limitStickTravel: true,
            stickRadius: 70,
        });

        /*----code for logging touch events
         joystick.addEventListener('touchStart', function(){
         console.log('down')
         });
         joystick.addEventListener('touchEnd', function(){
         console.log('up')
         });
         */

        //updating the bottom text that tells us what position the joystick is in.
        setInterval(function () {
            var outputEl = document.getElementById('text1');
            if (joystick.deltaX() != 0 || joystick.deltaY() != 0) {
                outputEl.innerHTML = '<b>Joystick:</b> '
                    + ' dx:' + joystick.deltaX()
                    + ' dy:' + joystick.deltaY();
            } else {
                outputEl.innerHTML = ' ';
            }
        }, 1 / 30 * 1000);


        var uppressed = downpressed = leftpressed = rightpressed = keyunpressed = false;

        function keydownfunction(e) {
            switch (e.keyCode) {
                case 37:
                    leftpressed = true;
                    break;
                case 38:
                    uppressed = true;
                    break;
                case 39:
                    rightpressed = true;
                    break;
                case 40:
                    downpressed = true;
                    break;
            }
            keyunpressed = false;
        }

        function keyupfunction(e) {
            switch (e.keyCode) {
                case 37:
                    leftpressed = false;
                    break;
                case 38:
                    uppressed = false;
                    break;
                case 39:
                    rightpressed = false;
                    break;
                case 40:
                    downpressed = false;
                    break;
            }
            keyunpressed = true;
        }

        window.addEventListener("keydown", keydownfunction, false);
        window.addEventListener("keyup", keyupfunction, false);

        var joystickX = 0;
        var joystickY = 0;

        setInterval(function () {
            //if a key is currently pressed, send a command for it instead of for the joystick.
            if (keyunpressed) {
                keyunpressed = false;
                socket.emit('fromclient', {commandtype: "move", joystickX: 0, joystickY: 0});
            }
            if (uppressed || downpressed || leftpressed || rightpressed) {
                if (rightpressed) {
                    socket.emit('fromclient', {commandtype: "move", joystickX: 100, joystickY: 0});
                }
                else if (leftpressed) {
                    socket.emit('fromclient', {commandtype: "move", joystickX: -100, joystickY: 0});
                }
                else if (uppressed) {
                    socket.emit('fromclient', {commandtype: "move", joystickX: 0, joystickY: -100});
                }
                else if (downpressed) {
                    socket.emit('fromclient', {commandtype: "move", joystickX: 0, joystickY: 100});
                }
            }
            else if (joystick.deltaX() != joystickX || joystick.deltaY() != joystickY) {
                joystickX = joystick.deltaX();
                joystickY = joystick.deltaY();
                socket.emit('fromclient', {
                    commandtype: "move",
                    joystickX: Math.round(joystickX),
                    joystickY: Math.round(joystickY)
                });
            }
        }, 50);
});