module.exports = {
  
  normalize: function extract(phoneNumber) {
    var phone = {
      prefix : '',
      number: '',
      postfix: ''
    }
    
    var m = phoneNumber.match(/^(\+?[0-9]{1,3})?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?(.*)?$/);
    phone.prefix = (m[1])?m[1]:'';
    phone.number = m[2]+m[3]+m[4];
    phone.postfix = m[5];
    
    return phone;

  },

  format: function format(phoneNumber, formatString, options) {

    // Normalize the phone number first unless not asked to do so in the options
    if (!options || !options.normalize) {
      phoneNumber = this.normalize(phoneNumber)
    };

    for ( var i = 0, l = phoneNumber.number.length; i < l; i++ ) {
      formatString = formatString.replace("N", phoneNumber.number[i]);
    }
    
    if(phoneNumber.prefix.trim() !== '' && options.includePrefix){
      formatString = phoneNumber.prefix.trim() +" "+formatString;
    }
    
    if(phoneNumber.postfix.trim() !== '' && options.includePostfix){
      formatString = formatString + " " + phoneNumber.postfix.trim();
    };
 
  
    return formatString;

  },

};
