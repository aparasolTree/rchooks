let styleId = '#react-use__useStyle_styleTagId';
let styleElement = document.querySelector<HTMLStyleElement>(styleId);
if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute('id', styleId);
}
document.head.append(styleElement);

export default styleElement;
