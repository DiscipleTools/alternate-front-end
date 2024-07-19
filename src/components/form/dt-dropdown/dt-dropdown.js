import { html, css, LitElement } from 'lit';
import DtFormBase from '../dt-form-base.js';
import './../dt-button/dt-button.js';
import '../../layout/dt-modal/dt-modal.js'
import { styleMap } from 'lit/directives/style-map.js';


export class DtDropdown extends LitElement {
  static get styles() {
    return css`
        :host {
          display: block;
        }
        dt-button {
          background-color: var(--button-color, #3498db);
          color: white;
          border: none;
          cursor: pointer;
          border-radius:5px
        }
        button:hover {
          background-color: var(--button-hover-color, #2980b9);
        }
        slot {
         display: none;
         min-width:200px;
      position: absolute;
      top: calc(100% + 0px); /* Position below the button */
      left: 0;
      z-index: 1000; /* Set the z-index high to appear above other elements */
      border: 1px solid gray;
      padding: 10px;
      background-color: white
        }
        button:hover + slot {
          display: block;
        }
         .btnn {
      display: inline-block;
      position: relative;
    }
    .btnn:hover slot {
      display: block;
    }
       .dropdown-icon {
      margin-left: 5px; /* Adjust the margin as needed */
    }
 


      .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown ul {
  // position: absolute;
  z-index: 999;
  display: none;
  // left: -100vw;
  // top: calc(1.5em + 14px);
  border: 0.5px solid #3f729b;
  background: #fff;
  padding: 6px 0;
  margin: 0;
  list-style: none;
  width: 100%;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: 0 3px 8px rgba(0,0,0,.15);
  -moz-box-shadow: 0 3px 8px rgba(0,0,0,.15);
  box-shadow: 0 3px 8px rgba(0,0,0,.15);
}

.dropdown ul a {
  display: block;
  padding: 6px 15px;
  text-decoration: none;
  color: #3f729b;
}

.dropdown ul a:hover,
.dropdown ul a:focus {
 background-color: var(--button-hover-color, #2980b9);
}

.alter{
color:#3f729b
padding: 5px 15px 5px 15px;
font-size: 1rem;
}

.alter:hover{
background-color: var(--button-hover-color, #2980b9);
}
      `
      ;
  }

  static get properties() {
    return {
      options: { type: Array },
      label: { type: String },
      isModal: { type: Boolean },
      buttonStyle: { type: Object },
      selectedOptionLabel: { type: String },
    };
  }

  constructor() {
    super();
    }
    render() {
    return html`
    <div class="dropdown">
    <button 
    style=${styleMap(this.buttonStyle || {})}
    @mouseover=${this._handleHover}
    @mouseleave=${this._handleMouseLeave}>
    
    ${this.selectedOptionLabel} \u25BC
    
    </button>
    <ul 
    @mouseover=${this._handleHover} 
    @mouseleave=${this._handleMouseLeave}>

    ${this.options.map(option => html`
    ${option.isModal ? html`
    <li>
    <dt-modal 
    class="alter" 
    dropdownListImg=${option.icon}
    buttonLabel="${option.label}" 
    buttonClass={} 
    buttonStyle =${JSON.stringify({ 'color': '#3f729b', 'background': 'none', 'border': 'none' })}>
    </dt-modal>
    </li>
    ` :
        html`
    <li class="alter">
    <a href="${option.href}">
    <img src=${option.icon} style="width = 15px; height : 15px"> ${option.label}
    </a>
    </li>
    `}
    `)}
    </ul>

    </div>
    `;
  }


  _handleHover(event) {
    const ulElement = this.shadowRoot.querySelector('ul');
    ulElement.style.display = 'block';
  }

  _handleMouseLeave(event) {
    const ulElement = this.shadowRoot.querySelector('ul');
    ulElement.style.display = 'none';
  }

}


window.customElements.define('dt-dropdown', DtDropdown);