    $(document).ready(function () {

      //timer


      var intervalId;

      var timerRunning = false;

      var timer = 60;


      $("#time-display").text("Time Left: 01:00");

      if (!timerRunning) {

        intervalId = setInterval(count, 1000);
        timerRunning = true;

        console.log(timerRunning);

      }

      function stopTimer() {

        timerRunning = false;
        clearInterval(intervalId)

      };

      function count() {

        timer--;

        console.log(timer);

        var convertTime = timeConverter(timer);

        $("#time-display").text(convertTime);

        if (timer === 0) {

          clearInterval(intervalId);
          timerRunning = false;
          alert("Time's Up!");

        }

      }

      function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {

          seconds = "0" + seconds;


        }

        if (minutes === 0) {

          minutes = "00";

        }

        return "Time Left: " + minutes + ":" + seconds;


      }









      // create question bank
      var questions = [{
          question: 'Under what name did Engelbert Humperdinck make his first records?',
          answer: 'Arnold Dorsey',
          choices: ['Gerry Dorsey', "Jimmy Dorsey", "Arnold Dorsey", "Tommy Dorsey"],
          userAnswer: ""
        },
        {
          question: 'What was Englebert first number one hit',
          answer: 'Release Me"',
          choices: ['A Man Without Love', "Winter World of Love", "The Last Waltz", "Release Me"],
          userAnswer: ""
        },
        {
          question: 'In what year did his first number one song come out?',
          answer: '1967',
          choices: ['1967', "1968", "1969", "1970"],
          userAnswer: ""
        },
        {
          question: 'What was his second number one hit?',
          answer: 'The Last Waltz',
          choices: ['The Last of the Romantics', "Last Song", "Too Beautiful to Last", "The Last Waltz"],
          userAnswer: ""
        },
        {
          question: 'In what year did his second number one song come out?',
          answer: '1967',
          choices: ['1967', "1968", "1969", "1970"],
          userAnswer: ""
        },
        {
          question: 'On the 1970 album "We Made It Hapen," Englebert recorded which Stevie Wonder Song?',
          answer: 'My Cherie Amour',
          choices: ['My Cherie Amour', "Sweetheart", "Sweet Marjorene", "Girl of Mine"],
          userAnswer: ""
        },
      ];

      // set user score
      var correct = 0;
      var wrong = 0;



      // function to print all questions to page
      function renderQuestions() {
        // clear out form
        $("#quiz-form").empty();



        // Loop through questions array
        questions.forEach(function (question, index) {
          // create div to hold question
          var $question = $("<div>").addClass("form-group");
          // <div class="form-group"></div>

          // add question to div
          var $label = $("<h4>")
            .text(question.question)
            .appendTo($question);
          /*
            <div class="form-group"> 
              <h4>Question 1</h4> 
            </div>
          */

          // when done making all of the choices, add whole question to the page
          $("#quiz-form").append($question);

          // shuffle choices
          //question.choices = question.choices.sort(function() {
          //  return .5 - Math.random();
          //});

          // create a loop to iterate through question's choices and create radio buttons for each one
          for (var i = 0; i < question.choices.length; i++) {
            // create a div for choice and add bootstrap classes
            var $choice = $('<div>').addClass('form-check form-check-inline');

            // create an input tag for the radio button
            var $radio = $('<input>');

            // add attributes to provide the answer choice
            // the "name" attribute is super important, all radio buttons per question need to have the same "name" so they know which question it applies to
            $radio
              .attr({
                type: "radio",
                value: question.choices[i],
                name: index,
                class: "form-check-input"
              })
              .appendTo($choice);

            // create label to actually print the choice to the page
            var $choiceLabel = $('<label>')
              .text(question.choices[i])
              .addClass('form-check-label')
              .appendTo($choice);

            // add whole radio button choice to question
            $choice.appendTo($question);
          }
          // when done making all of the choices, add whole question to the page

        });
      }

      // create on "change" listener for all radio buttons but bind them to quiz-form since it's permanently on the page
      $("#quiz-form").on("change", ".form-check-input", function () {
        console.log(this);

        // GET question index out of "name" attribute so we know what question you answered
        var questionIndex = $(this).attr("name");

        console.log(questions[questionIndex]);

        // get value out of radio button you selected
        var answer = $(this).val();

        // set answer to question's userAnswer property
        questions[questionIndex].userAnswer = answer;

        if (answer === questions[questionIndex].answer) {
          correct++;
        } else {
          wrong++;
        }


      });

      $("#reset").on("click", function(event) {
        window.location.reload();
      });
      renderQuestions();

      $("#submit").on("click", tallyStats);

      function tallyStats(event) {

        event.preventDefault();

        stopTimer();

        $("#stats").append("Correct: " + correct + " | " + "Wrong: " + wrong);

        $(this).prop('disabled', true);

        $("#reset").removeClass("d-none");

        };

    });

   