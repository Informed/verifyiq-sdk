/* eslint-disable no-undef */

// polyfill for IE11
if (!Object.values) {
  Object.values = function (obj) {
    return Object.keys(obj).map(function (e) {
      return obj[e];
    });
  };
}

function addClass(element, className) {
  var arr = element.className.split(' ');
  if (arr.indexOf(className) == -1) {
    element.className += ' ' + className;
  }
}

function removeClass(element, className) {
  element.className = element.className.replace(className, '');
}

function renderOptions({ node, options, values }) {
  for (let i = 0; i < options.length; ++i) {
    var optionKey = options[i];
    var optionValue = values[optionKey];
    var option = document.createElement('option');
    var text = document.createTextNode(optionKey);
    option.setAttribute('value', optionValue);
    option.appendChild(text);
    node.appendChild(option);
  }
}

function openModal(modalNode) {
  addClass(modalNode, 'md-show');
}

function mdModal(modalNode) {
  removeClass(modalNode, 'md-show');
}

function init() {
  var root = document.getElementById('root');
  var applicationNode = document.getElementById('applicationId');
  var applicantTypeNode = document.getElementById('applicantType');
  var stipulationTypeNode = document.getElementById('stipulationType');
  var modalNode = document.getElementById('modal');
  var closeBtnNode = document.getElementById('close');

  var viq = new VerifyIQ({
    authToken: 'Basic YWxseUBkcml2ZWluZm9ybWVkLmNvbTpOdkFiUmltWGlyOWdIMU5NVmVNZnVBPT0=',
    actionCallbackWebhookUrl: 'https://39d3129fa6a9.ngrok.io/webhook',
    environment: VerifyIQ.Staging,

    onPass: function (actionObject, reason) {
      /* Stipulation action handler */
      console.log('Pass', actionObject, reason);
    },

    onDocumentRequestedViaSms: function (stipObjects) {
      console.log('onRequestDocumentsViaSms', stipObjects);
    },

    onIncomplete: function (actionObject, reason) {
      /* Stipulation action handler */
      console.log('Incomplete', actionObject, reason);
    },

    onWaive: function (actionObject, reason) {
      /* Stipulation action handler */
      console.log('Waive', actionObject, reason);
    },

    onLoad: function (payload) {
      /* Iframe onLoad event handler */
      console.log('Frame is loaded', payload);
    }
  });

  viq.enableLogging(true);

  renderOptions({ 
    node: applicantTypeNode,
    options: Object.keys(VerifyIQ.ApplicantTypes),
    values: VerifyIQ.ApplicantTypes
  });
  renderOptions({ 
    node: stipulationTypeNode,
    options: Object.keys(VerifyIQ.StipulationTypes),
    values: VerifyIQ.StipulationTypes
  });

  var renderBtn = document.getElementById('render');
  applicationNode.onkeyup = function (e) {
    if (e.which === 13) {
      render();
    }
  };

  renderBtn.addEventListener('click', function () {
    render();
  });

  closeBtnNode.addEventListener('click', function () {
    mdModal(modalNode);
  });

  function render() {
    var applicationId = applicationNode.value;
    var applicant = applicantTypeNode.options[applicantTypeNode.selectedIndex].value;
    var stipulation = stipulationTypeNode.options[stipulationTypeNode.selectedIndex].value;

    if (applicationId.trim() === '') {
      return;
    }

    console.log('Loading application');
    console.log('applicationId    ---', applicationId);
    console.log('Applicant type   ---', applicant);
    console.log('Stipulation type ---', stipulation);

    root.innerHTML = '';
    openModal(modalNode);
    viq.renderApplicationId({
      htmlElement: root,
      applicationId: applicationId,
      applicant: applicant,
      stipulation: stipulation
    });
  }
}

init();