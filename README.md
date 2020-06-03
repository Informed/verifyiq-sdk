<div align="center" style="padding: 20px 0 0 0; box-shadow: 2px 2px; background-color: rgb(41, 142, 103);">
  <a href="https://informed.iq/" rel="noopener" target="_blank" >
    <img width="200" src="https://user-images.githubusercontent.com/13334788/83625127-86064980-a5a4-11ea-919a-3d6ee3e17a89.png" alt="verify-iq">
  </a>
  <h1 align="center">VerifyIQ SDK</h1>
</div>

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
