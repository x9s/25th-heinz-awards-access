const scriptURL = 'https://script.google.com/macros/s/AKfycbzPtz839njMg1c41Vqo_2QTiwO7ZjwOCDMhFqIgPM9XLuRJSHI/exec'
const form = document.forms['verify-access-form']

$(document).ready(function(){

    // Get and set IP data
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        $("#ip").val(data.ip);
    });

    $("#submit").click(function(e){

        // Suppress POST
        e.preventDefault();

        // Retrieve the input field text
        var filter = $("#email").val();

        // Process data, make available, run comparison
        var emAdd = [];
        $.get('/emadd.txt', function(data) {
            emAdd = data.split("\n");
            compareEntry(emAdd);
        });

        var found = false;

        function compareEntry(data) {

            if ( filter == null || filter == "" ){
                alert("Please, enter your email address")
                return false;
            }

            else {

                // Create an easily searchable list of data
                $.each( data, function(i, val){
                    $('#fauxdb').append('<li>' + val.toLowerCase() + '</li>');
                });

                // Search the data
                $("#fauxdb").find('*').filter(function() {
                    if ( $(this).text() === filter.toLowerCase() ){
                      $('#error-message').hide();
                      found = true;
                      return false;
                    }
                }), isFound();
            }
        }

        function isFound(){
            if ( found == false ){
                $('#error-message').show();
            }
            else {
              $('#error-message').hide();
              fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {window.location.href = "https://25thheinzawards.com"})
            }
        };
    });
});
