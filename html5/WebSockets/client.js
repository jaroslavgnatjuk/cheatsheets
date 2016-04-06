(function (angular) {
    angular
        .module('app')
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', 'httpService'];

    function mainCtrl($scope, httpService) {
        var main = this,
            ws = new WebSocket("ws://10.1.207.70:50009");

        main.message = '';
        main.messages = [];

        main.testClick = testClick;

        function testClick() {
            send();
        }

        function send() {
            ws.send(main.message);
        }

        function wsStart() {
            ws.onopen = function() { console.log("<p>система: соединение открыто</p>"); };
            ws.onclose = function() { console.log("<p>система: соединение закрыто, пытаюсь переподключиться</p>");};
            ws.onmessage = function(evt) { main.messages.push(evt.data); $scope.$apply();};
        }

        (function () {
            wsStart();
        })();

    }
})(angular);

