# What is this thing?
A simple plugin for making textarea elements capable of being resized automatically based on the combined height of its content.


## Usage

    $(function() {
      $("textarea").autoResize()
    })

Or if you prefer to have the height adjustment happen without animation:

    $(function() {
      $("textarea").autoResize({ animateOptions: null })
    })

