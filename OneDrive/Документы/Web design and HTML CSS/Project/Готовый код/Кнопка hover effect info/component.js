const template = document.createElement('template');

template.innerHTML = `
  <style>    
.container {
   
    font-family: 'Courier New', Courier, monospace;
    color: white;    
    font-weight:400; 
}

.ellipse {
    display: flex;
    align-items: center;
    margin-top: 200px;
    width: 250px;
    height: 250px;
    background: #FF6F08;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
    position: relative;    
}



.text {
    padding:0px 10px;
    text-align:center;   
    inline-size: 230px;
    overflow-wrap: break-word;
    
    
}

.overlay {
    display:flex;
    margin-top: 125px;
    position: absolute;
    width:250px;
    height:125px;
    background-color: #FF6F08;;
    border-bottom-left-radius: 135px;  
    border-bottom-right-radius: 135px;   
    align-items:center;
    justify-content:center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size:22px;
}

.overlay-picture {
    position: absolute;
    background-image: url(./Picture1.jpg);
    width: 250px;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 100%;
}

.overlay-transparent {
    position: absolute;
    width: 250px;
    height: 250px;
    background: #000000;
    opacity:0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 100%;
}


}
  </style>

    <div class="container">
        <div class="ellipse" id="ellipse">
            <p class="text" id="text"></p>
            <div class="overlay-picture" id="pic"></div>
            <div class="overlay" id="overlay"></div>
            <div class="overlay-transparent" id="overlay-transparent"></div>
        </div>  
    </div>
`;

class Button extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this.$overlayTransparent = this._shadowRoot.querySelector('#overlay-transparent');
    this.$overlayHalf = this._shadowRoot.querySelector('#overlay');
    this.$overlayPicture = this._shadowRoot.querySelector('#pic');
    this.$text = this._shadowRoot.querySelector('#text');

    this.$overlayTransparent.addEventListener('mouseover', () => {
        this.$overlayHalf.style.transform = 'translateY(-190px)';
        this.$overlayHalf.style.transitionDuration = '1s';
        this.$overlayPicture.style.transform = 'translateY(-190px)';
        this.$overlayPicture.style.transitionDuration = '1s';
        this.$overlayPicture.style.opacity = '0';        
      });
      
    this.$overlayTransparent.addEventListener('mouseout', () => {
        this.$overlayHalf.style.transform = 'translateY(0)'
        this.$overlayPicture.style.transform = 'translateY(0)';
        this.$overlayPicture.style.opacity = '1';   
      });
      

    
  }
  
  static get observedAttributes() {
    return ['label', 'text'];
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(value) {
    this.setAttribute('text', value);
  }

  // static get observedAttributes() {
  //   return ['label', 'text'];
  // }

  attributeChangedCallback(name, oldVal, newVal) {
    this.render();
  }

  render() {
    this.$overlayHalf.innerHTML = this.label;
    this.$text.innerHTML = this.text;
  }

}

window.customElements.define('my-button', Button);