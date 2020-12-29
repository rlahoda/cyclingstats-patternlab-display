// (function(w) {
//   var sw = document.body.clientWidth,
//     sh = document.body.clientHeight;

//   $(w).resize(function() {
//     //Update dimensions on resize
//     sw = document.body.clientWidth;
//     sh = document.body.clientHeight;

//     //updateAds();
//   });}

  //Navigation toggle
function navToggle() {
  const button = document.querySelector('#primary-nav');
    button.classList.toggle("primary-nav--expanded");
    button.classList.toggle("primary-nav--open");
    
  }


function navInit() {
  const button = document.querySelector('#primary-nav__menu-button');
  if (button) {
    
    button.addEventListener('click',navToggle);
  }
}

function accordionToggle(event) {
  const value = event.target.value;
  const accordion = document.querySelector(`#${value}`);
  const open = accordion.open;
    accordion.open = !open;
    
  }


function accordionInit() {
  const buttonList = document.querySelectorAll('.accordion__close-button');
  for (const button of buttonList) {
    button.addEventListener('click',accordionToggle);
  }
}

class Accordion {
  constructor(el) {
    // Store the <details> element
    this.el = el;
    // Store the <summary> element
    this.summary = el.querySelector('summary');
    // Store the <div class="content"> element
    this.content = el.querySelector('.content');

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;
    // Detect user clicks on the summary element
    this.summary.addEventListener('click', (e) => this.onClick(e));
    // Create close button at bottom of element
    const button = document.createElement("button");
    button.classList.add("accordion__close-button")
    // Create span to hold hidden text for accessibility
    const buttonSpan = document.createElement("span");
    buttonSpan.classList.add("visually-hidden")
    // Create hidden text
    const buttonSpanText = document.createTextNode("Close");
    // Add hidden text to span
    buttonSpan.appendChild(buttonSpanText);
    // add span to button
    button.appendChild(buttonSpan);
    // Add button to details element
    button.addEventListener('click', (e) => this.onClick(e));
    el.appendChild(button);
  }


  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    this.el.style.overflow = 'hidden';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.el.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;
    
    // Store the current height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.summary.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.el.style.height = `${this.el.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.el.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.el.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }
    
    // Start a WAAPI animation
    this.animation = this.el.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.el.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.el.style.height = this.el.style.overflow = '';
  }
}

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});




navInit();
// accordionInit();