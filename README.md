<p align="center" style="box-shadow: 2px 2px;">
  <a href="https://informed.iq/" rel="noopener" target="_blank" >
    <img width="200" src="https://informed.iq/wp-content/uploads/2020/01/logo-informed-white.png" alt="verify-iq">
  </a>
</p>
<h1 align="center">VerifyIQ SDK</h1>

## Getting started

To install latest version
```sh
$ yarn add @informed-iq/verify-iq-sdk
```


## Usage

#### Simplest way

**1. Instantiate SDK**
```js
const viq = new VerifyIQ({
  url: 'url-to-verify-iq'
});
```

**2. Add root DOM element in the HTML**
```html
<div id="verify-iq-root"></div>
```

**3. Render VerifyIQ in the given DOM element**
```js
const verifyIQRoot = document.querySelector('#verify-iq-root');
viq.render(verifyIQRoot);
```

#### Configure SAML Login
```js
viq.setAuth(VerifyIQ.auth.Popup);
```

#### Add event listeners
```js
viq.on(VerifyIQ.events.Loaded, () => {
  console.log('VerifyIQ Loaded');
});
```

## Constants

### AuthTypes

Accessible as **`VerifyIQ.auth`**;

| Auth | Description |
| ------ | ------ |
| Popup | Set SAML auth to be processable in the Popup window |
| Tab | Set SAML auth to be processable in the separate tab |

### EventTypes

Accessible as **`VerifyIQ.events`**;

| Event | Description |
| ------ | ------ |
| Loaded | Event represents VerifyIQ loaded event and will trigger on first contentful paint |