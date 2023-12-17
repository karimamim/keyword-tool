jQuery(document).ready(function ($) {
  var _separator = "";
  var _wordPrefix = "";
  var _result = "";
  var _lowercase = false;

  function resetVars() {
    var _separator = "";
    var _wordPrefix = "";
    var _result = "";
    var _lowercase = false;
  }

  function resetBoxes() {
    $("#firstBox, #secondBox, #thirdBox").val("");
  }

  function resetResult() {
    _result = "";
    $("#resultBox").val("");
  }

  $(function () {
    // getting option values
    $("#optNothing").click(function () {
      _separator = "";
      _wordPrefix = "";
    });
    $("#optSpace").click(function () {
      _separator = " ";
      _wordPrefix = "";
    });
    $("#optMinus").click(function () {
      _separator = "-";
      _wordPrefix = "";
    });
    $("#optPlus").click(function () {
      _separator = " +";
      _wordPrefix = "+";
    });

    // getting lowercase option
    $("#chkLowercase").click(function () {
      if ($(this).is(":checked")) _lowercase = true;
      else _lowercase = false;
    });

    $("#btnClear").click(function () {
      //resetVars();
      resetResult();
      resetBoxes();
      $("#btnSelect").text("Copy Output Keywords");
      $("#btnSelect").removeClass("btn-select-active");
    });

    $("#btnMake").click(function () {
      resetResult();
      $("#btnSelect").text("Copy Output Keywords");
      $("#btnSelect").removeClass("btn-select-active");

      // // broad match
      // if($('#chkBroadMatch').is(':checked')) _result += (_result != '' ? '\n' : '') + make();

      // // modified broad match
      // if($('#chkModiBroad').is(':checked')) {
      // 	//var _tmpSeparator  = _separator;
      // 	var _tmpWordPrefix = _wordPrefix;

      // 	//_separator  =  _separator == ' ' ? ' +' : _separator;
      // 	_wordPrefix = '+';

      // 	_result += (_result != '' ? '\n' : '') + make();

      // 	//_separator  = _tmpSeparator;
      // 	_wordPrefix = _tmpWordPrefix;

      // }

      // // exact match
      // if($('#chkExactMatch').is(':checked')) _result += (_result != '' ? '\n' : '') + make('[', ']');

      // // phrase match
      // if($('#chkPhrMatch').is(':checked')) _result += (_result != '' ? '\n' : '') + make('"', '"');

      // // if nothing is selected to include do a braod match
      // if(_result == '') _result = make();

      _result = make();

      $("#resultBox").val(_result);
    });

    $("#btnSelect").click(function () {
      $("#resultBox").select();
      document.execCommand("copy");
      $("#btnSelect").text("Output keywords are copied");
      $("#btnSelect").addClass("btn-select-active");
    });

    $("#btnSelect").tooltip({
      position: {
        my: "left top-50",
        at: "left top-100",
        using: function (position, feedback) {
          $(this).css(position);
          $("<div>")
            .addClass("arrow")
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
        },
      },
    });

    $("#btnSelect").on({
      click: function () {
        $(this).tooltip({
          items: "#btnSelect",
          content: "",
        });
        $(this).tooltip("open");
      },
      mouseout: function () {
        $(this).tooltip("disable");
      },
    });

    // setting up page with default values
    pagesetup();
  });

  function pagesetup() {
    $("#optSpace").click();
    //$('#chkBroadMatch').click();
    //$('#chkModiBroad').click();
    //$('#chkExactMatch').click();
    //$('#chkPhrMatch').click();
    //$('#chkLowercase').click();
  }

  function make(pre, suf) {
    var pre = (suf = "");

    if (typeof pre === "undefined" || typeof pre == undefined) pre = "";
    if (typeof suf === "undefined" || typeof suf == undefined) suf = "";

    var t1, t2, t3;
    var b1, b2, b3;
    var ln = "";
    var res = "";

    var matchModiBroad = $("#chkModiBroad").is(":checked");
    var matchExact = $("#chkExactMatch").is(":checked");
    var matchPhrase = $("#chkPhrMatch").is(":checked");
    var matchBroad =
      $("#chkBroadMatch").is(":checked") ||
      (!matchModiBroad && !matchExact && !matchPhrase);

    t1 = $.trim($("#firstBox").val());
    t2 = $.trim($("#secondBox").val());
    t3 = $.trim($("#thirdBox").val());

    if (_lowercase) {
      t1 = t1.toLowerCase();
      t2 = t2.toLowerCase();
      t3 = t3.toLowerCase();
    }

    b1 = t1.split("\n");
    b2 = t2.split("\n");
    b3 = t3.split("\n");

    // looping for first box
    for (i = 0; i < b1.length; i++) {
      // looping for second box
      for (j = 0; j < b2.length; j++) {
        // looping for third box
        for (k = 0; k < b3.length; k++) {
          b1[i] = $.trim(b1[i]);
          b2[j] = $.trim(b2[j]);
          b3[k] = $.trim(b3[k]);

          // broad match
          if (matchBroad) {
            ln = "";
            pre = suf = "";

            if (b1[i] != "") ln = b1[i];

            if (b2[j] != "") ln += (ln != "" ? _separator : "") + b2[j];

            if (b3[k] != "") ln += (ln != "" ? _separator : "") + b3[k];

            // complete the line
            ln = $.trim(ln);

            if (_wordPrefix == "+") ln = ln.replace(/ /g, " +");

            if (ln != "")
              res += (res != "" ? "\n" : "") + _wordPrefix + pre + ln + suf;
            ln = "";
          }

          // modified broad match
          if (matchModiBroad) {
            var _tmpWordPrefix = _wordPrefix;

            //_separator  =  _separator == ' ' ? ' +' : _separator;
            _wordPrefix = "+";

            ln = "";
            pre = suf = "";

            if (b1[i] != "") ln = b1[i];

            if (b2[j] != "") ln += (ln != "" ? _separator : "") + b2[j];

            if (b3[k] != "") ln += (ln != "" ? _separator : "") + b3[k];

            // complete the line
            ln = $.trim(ln);

            if (_wordPrefix == "+") ln = ln.replace(/ /g, " +");

            if (ln != "")
              res += (res != "" ? "\n" : "") + _wordPrefix + pre + ln + suf;
            ln = "";

            //_separator  = _tmpSeparator;
            _wordPrefix = _tmpWordPrefix;
          }

          // phrase match
          if (matchPhrase) {
            ln = "";
            pre = suf = '"';

            if (b1[i] != "") ln = b1[i];

            if (b2[j] != "") ln += (ln != "" ? _separator : "") + b2[j];

            if (b3[k] != "") ln += (ln != "" ? _separator : "") + b3[k];

            // complete the line
            ln = $.trim(ln);

            //if(_wordPrefix == '+') ln = ln.replace(/ /g," +");

            if (ln != "")
              res += (res != "" ? "\n" : "") + _wordPrefix + pre + ln + suf;
            ln = "";
          }

          // exact match
          if (matchExact) {
            ln = "";
            pre = "[";
            suf = "]";

            if (b1[i] != "") ln = b1[i];

            if (b2[j] != "") ln += (ln != "" ? _separator : "") + b2[j];

            if (b3[k] != "") ln += (ln != "" ? _separator : "") + b3[k];

            // complete the line
            ln = $.trim(ln);

            //if(_wordPrefix == '+') ln = ln.replace(/ /g," +");

            if (ln != "")
              res += (res != "" ? "\n" : "") + _wordPrefix + pre + ln + suf;
            ln = "";
          }

          // if(b1[i] != '') ln = b1[i];

          // if(b2[j] != '') ln += (ln != '' ? _separator : '') + b2[j];

          // if(b3[k] != '') ln += (ln != '' ? _separator : '') + b3[k];

          // // complete the line
          // ln = $.trim(ln);

          // if(_wordPrefix == '+') ln = ln.replace(/ /g," +");

          // if(ln != '') res +=  (res != '' ? '\n' : '') + _wordPrefix + pre + ln + suf;
          // ln = '';
        }
      }
    }

    return res;
  }

  // // select result text
  // function selectText(el) {

  // 	var tempval= document.getElementById(el);

  // 	tempval.focus();

  // 	tempval.select();

  // 	//therange = tempval.createTextRange();

  // 	//therange.execCommand("Copy");

  // }
});

//$( document ).ready( function() {
jQuery(document).ready(function ($) {
  $("input#select-all").bind("click", function () {
    if ($(this).is(":checked")) {
      $("input[type=checkbox]").each(function () {
        if (!$(this).is(":checked")) {
          $(this).click();
        }
      });
    } else {
      $("input[type=checkbox]").each(function () {
        if ($(this).is(":checked")) {
          $(this).click();
        }
      });
    }
  });
});
