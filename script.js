AFRAME.registerComponent('cursor-listener', {
  init: function () {
    // Click interaction
    this.el.addEventListener('click', function (evt) {
      this.setAttribute('color', '#' + Math.floor(Math.random()*16777215).toString(16));
    });

    // Hover enter interaction
    this.el.addEventListener('mouseenter', function (evt) {
      this.setAttribute('scale', '1.2 1.2 1.2');
    });

    // Hover leave interaction
    this.el.addEventListener('mouseleave', function (evt) {
      this.setAttribute('scale', '1 1 1');
    });

    // Mouse down (pressing)
    this.el.addEventListener('mousedown', function (evt) {
      this.setAttribute('material', 'opacity', 0.5);
    });

    // Mouse up (releasing)
    this.el.addEventListener('mouseup', function (evt) {
      this.setAttribute('material', 'opacity', 1);
    });

    // Focusing the object
    this.el.addEventListener('focus', function (evt) {
      this.setAttribute('material', 'wireframe', true);
    });

    // Losing focus
    this.el.addEventListener('blur', function (evt) {
      this.setAttribute('material', 'wireframe', false);
    });
  }
});

AFRAME.registerComponent('draggable', {
  init: function() {
    this.el.addEventListener('mousedown', this.onDragStart.bind(this));
    this.el.addEventListener('mouseup', this.onDragEnd.bind(this));
    this.dragState = false;
  },

  onDragStart: function(evt) {
    this.dragState = true;
    this.el.addEventListener('mousemove', this.onDrag.bind(this));
  },

  onDrag: function(evt) {
    if (this.dragState) {
      this.el.object3D.position.copy(evt.detail.intersection.point);
    }
  },

  onDragEnd: function(evt) {
    this.dragState = false;
    this.el.removeEventListener('mousemove', this.onDrag.bind(this));
  }
});

AFRAME.registerComponent('door-animation', {
  init: function() {
    this.isOpen = false;
    this.el.addEventListener('click', () => {
      const animation = {
        property: 'rotation',
        dur: 1000,
        easing: 'easeOutQuad'
      };
      
      if (!this.isOpen) {
        animation.to = '0 -90 0';
      } else {
        animation.to = '0 0 0';
      }
      
      this.el.removeAttribute('animation');
      this.el.setAttribute('animation', animation);
      this.isOpen = !this.isOpen;
    });
  }
});
