$(document).ready(function(){

    $("#email_submit").click(function(e){

        // Suppress POST
        e.preventDefault();

        // Retrieve the input field text
        var filter = $("#email_address").val();

        // Process data, make available, run comparison
        var emAdd = [];
        jQuery.get('/emadd.txt', function(data) {
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
                    $('#fauxdb').append('<li>' + val + '</li>');
                });

                // Search the data
                $("#fauxdb").find('*').filter(function() {
                    if ( $(this).text() === filter ){
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
              window.location.href = "https://25thheinzawards.com";
            }
        };
    });
});
