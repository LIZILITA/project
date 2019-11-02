$(function () {
    $("#button1").click(function () {
        $("#display").val($('#display').val().toString()+"1");
    });
    $("#button2").click(function () {
        $("#display").val($('#display').val().toString()+"2");
    });
    $("#button3").click(function () {
        $("#display").val($('#display').val().toString()+"3");
    });
    $("#button4").click(function () {
        $("#display").val($('#display').val().toString()+"4");
    });
    $("#button5").click(function () {
        $("#display").val($('#display').val().toString()+"5");
    });
    $("#button6").click(function () {
        $("#display").val($('#display').val().toString()+"6");
    });
    $("#button7").click(function () {
        $("#display").val($('#display').val().toString()+"7");
    });
    $("#button8").click(function () {
        $("#display").val($('#display').val().toString()+"8");
    });
    $("#button9").click(function () {
        $("#display").val($('#display').val().toString()+"9");
    });
    $("#button0").click(function () {
        $("#display").val($('#display').val().toString()+"0");
    });
    $("#clearButton").click(function () {
        $("#display").val("");
    });
    $("#addButton").click(function () {
        $("#display").val($('#display').val().toString()+"+");
    });
    $("#subtractButton").click(function () {
        $("#display").val($('#display').val().toString()+"-");
    });
    $("#multiplyButton").click(function () {
        $("#display").val($('#display').val().toString()+"*");
    });
    $("#divideButton").click(function () {
        $("#display").val($('#display').val().toString()+"/");
    });
    $("#equalsButton").click(function () {
        var formula=$("#display").val();
        var num1=Number(formula.match(/\d+/g)[0]);
        console.log(num1);
        var Operator=formula.match(/\D/g)[0];
        console.log(Operator);
        var num2=Number(formula.match(/\d+/g)[1]);
        if(Operator==="+"){
            var result=(num1+num2).toString();
            $("#display").val(result);
        }else if(Operator==="-"){
            var result=(num1-num2).toString();
            $("#display").val(result);
        }else if(Operator==="*"){
            var result=(num1*num2).toString();
            $("#display").val(result);
        }else{
            if(num2===0){
                $("#display").val("无穷");
            }else {
                var result = (num1 / num2).toString();
                $("#display").val(result);
            }
        }
    });

});