import { requiredValidate as required } from './required';
import { minLengthValidate as min } from './min';
import { maxLengthValidate as max } from './max';

const all = { required, min, max };

export default all;
