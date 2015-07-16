/** @jsx React.DOM */

var STATES = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

var LOCALITY = [
  'Baner (Pune)', 'Pimple Saudagar (Pune)', 'Wakad (Pune)', 'Ravet (Pune)', 'Kalewadi (Pune)', 'Hinjewadi Ph1 (Pune)'
]

/** 
var APPOINTMENT = [
  '15-June-2015 morning', '15-June-2015 noon', '15-June-2015 evening'
]
*/

var DIAGNOSIS = [
  'Mechnaical back pain', 'Mechanical neck pain', 'Frozen shoulder', 'Post fracture stiffness', 'Post operative stiffness', 
  'Paralysis', 'Spondylolisthesis', 'Cerebral Palsy', 'Hemiplegia', 'Paraplegia', 'Quadriplegia', 'Parkinson\'s disease', 
  'Osteo-arthritis', 'Rheumotoid arthritis', 'Muscular dystrophy', 'PIVD', 'Brain injury', 'ACL repair', 'Radiculopathy', 
  'Congenital anomalies', 'Delayed milestones', 'Peripheral nerve injury', 'Geriatric (60+)', 'Ankylosing Spondilitis', 
  'Others - Ortho', 'Spondilitis', 'Bells palsy', 'Others - Neuro', 'Others'
]

//function To calculate appointment dates 7 days in advanace, starting next day, with 3 slots each day
function apptdates() {
  var date = new Date();
  //var id = d.setDate(d.getDate() + 1); 
  var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  var displaydate = [];
  for (i = 0; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    var day = days[date.getDay()];
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var dt = date.getDate();
    displaydate.push(day+", Morning ( "+dt+"-"+month+" )");
    displaydate.push(day+", Afternoon ( "+dt+"-"+month+" )");
    displaydate.push(day+", Evening ( "+dt+"-"+month+" )");
  }
  return displaydate;
}

var Example = React.createClass({
  getInitialState: function() {
    return {
      email: true
    , question: false
    , submitted: null
    }
  }

, render: function() {
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p><b>Details submitted successfully! </b>
        <br></br>CarePhysio representative will get back to you shortly.
        <br></br>If you want to reach us immediately, please call 1800 9876 20.</p>
      </div>
    //var xhr = new XMLHttpRequest();
    //var url = "http://127.0.0.1:3000/submit";
    //xhr.open("POST", url, true);
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    //xhr.send(JSON.stringify(this.state.submitted));
    $.ajax({
      type: 'POST',
      url: 'http://carephysio.in/schedule',
      data: this.state.submitted,
      dataType: 'application/json',
      //success: function(data) { 
      // alert("POSTED SUCCESSFULLY TO THE SERVER");
      // $('#subscribePage').html('<h1>POSTED</h1>');     
      //} // Success Function
      });   // Ajax Call

    //alert(JSON.stringify(this.state.submitted));
    //xhr.send();
    alert('Thankyou! We have received your details and will get back to you shortly. Meanwhile, in case you want to reach us immediately, please call 1800 9876 20')
    }

    return <div>
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">To schedule a home visit, <b>Start here</b></h3>
        </div>

        <div className="panel-body">
        {submitted}
          <ContactForm ref="contactForm"
            email={this.state.email}
            question={this.state.question}
            company={this.props.company}
          />

        </div>
        <div className="panel-footer">
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Schedule a HOME visit</button>
        </div>
      </div>
    </div>
  }

, handleChange: function(field, e) {
    var nextState = {}
    nextState[field] = e.target.checked
    this.setState(nextState)
  }

, handleSubmit: function() {
    if (this.refs.contactForm.isValid()) {
      this.setState({submitted: this.refs.contactForm.getFormData()})
    }
  }
})

/**
 * A contact form with certain optional fields.
 */
var ContactForm = React.createClass({
  getDefaultProps: function() {
    return {
      email: true
    , question: false
    }
  }

, getInitialState: function() {
    return {errors: {}}
  }

, isValid: function() {
    var fields = ['locality','appointment','diagnosis','phoneNumber', 'address']
    if (this.props.email) fields.push('email')
    if (this.props.question) fields.push('question')

    if (!trim(this.refs['locality'].getDOMNode().value)) {
        alert('Please select your locality!')
        this.refs['locality'].getDOMNode().focus();
        return false
    }

    if (!trim(this.refs['appointment'].getDOMNode().value)) {
        alert('Please select appointment slot!')
        this.refs['appointment'].getDOMNode().focus();
        return false
    }

    if (!trim(this.refs['diagnosis'].getDOMNode().value)) {
        alert('Please select diagnosis!')
        this.refs['diagnosis'].getDOMNode().focus();
        return false
    }

    var regexp = /^\d{10}$/;
    var phone = trim(this.refs['phoneNumber'].getDOMNode().value);
    if (!trim(this.refs['phoneNumber'].getDOMNode().value)) {
        alert('Please enter your 10 digit Mobile Number!')
        this.refs['phoneNumber'].getDOMNode().focus();
        return false
    } else if (!phone.match(regexp)){
      alert('Please enter 10 digit Mobile Number. Example - 9876543210. No need to add country code in the beginning.')
      this.refs['phoneNumber'].getDOMNode().focus();
      return false
    }

    if (!trim(this.refs['email'].getDOMNode().value)) {
        alert('Please enter your email address!')
        this.refs['email'].getDOMNode().focus();
        return false
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trim(this.refs['email'].getDOMNode().value))) {
      alert("You have entered an invalid email address!")
      this.refs['email'].getDOMNode().focus();
      return false
    } else if ((trim(this.refs['email'].getDOMNode().value)).length.toString() > 100){
      alert('email is too long!')
      this.refs['email'].getDOMNode().focus();
      return false
    }

    var addregex = /^[a-z0-9\s,'-]*$/i;
    var add = trim(this.refs['address'].getDOMNode().value);
    if (!trim(this.refs['address'].getDOMNode().value)) {
        alert('Please enter your name & address with pin!')
        this.refs['address'].getDOMNode().focus();
        return false
    } else if (!add.match(addregex)){
      alert('Invalid name or address! Please enter alphabets, numbers, hyphen and comma only in the name or address.' )
      this.refs['address'].getDOMNode().focus();
      return false
    } else if ((trim(this.refs['address'].getDOMNode().value)).length.toString() > 300){
      alert('name and address is too long!')
      this.refs['address'].getDOMNode().focus();
      return false
    }

    var errors = {}
    fields.forEach(function(field) {
      var value = trim(this.refs[field].getDOMNode().value)
      if (!value) {
        errors[field] = 'This field is required'
      }
    }.bind(this))
    this.setState({errors: errors})

    var isValid = true
    for (var error in errors) {
      isValid = false
      break
    }
    return isValid
  }

, getFormData: function() {
    var data = {
      locality: this.refs.locality.getDOMNode().value
    , appointment: this.refs.appointment.getDOMNode().value
    , diagnosis: this.refs.diagnosis.getDOMNode().value
    , phoneNumber: this.refs.phoneNumber.getDOMNode().value
    , address: this.refs.address.getDOMNode().value
    }
    if (this.props.email) data.email = this.refs.email.getDOMNode().value
    if (this.props.question) data.question = this.refs.question.getDOMNode().value
    return data
  }

, render: function() {
    return <div className="form-horizontal">
      {this.renderSelectLocality('locality', LOCALITY)}
      {this.renderSelectAppt('appointment', apptdates())}
      {this.renderSelectDiagnosis('diagnosis', DIAGNOSIS)}
      {this.renderTextInput('phoneNumber')}
      {this.props.email && this.renderTextInput('email')}
      {this.props.question && this.renderTextarea('question')}
      {this.renderTextareaAddress('address')}
    </div>
  }

, renderTextInput: function(id) {
  var ph = "Enter your ".concat(id);
    return this.renderField(id,
      <input type="text" className="form-control" placeholder={ph} id={id} ref={id}/>
    )
  }

, renderTextareaAddress: function(id) {
    return this.renderField(id,
      <textarea className="form-control" placeholder="Enter your Name & Address with Pin" id={id} ref={id}/>
    )
  }

, renderTextarea: function(id) {
    return this.renderField(id,
      <textarea className="form-control" placeholder="Add Comments" id={id} ref={id}/>
    )
  }

, renderSelectLocality: function(id, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id,
      <select className="form-control" id={id} ref={id}>
      <option value="" selected disabled>Select your locality</option>
        {options}
      </select>
    )
  }

, renderSelectAppt: function(id, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id,
      <select className="form-control" id={id} ref={id}>
      <option value="" selected disabled>Select Appointment</option>
        {options}
      </select>
    )
  }

, renderSelectDiagnosis: function(id, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id,
      <select className="form-control" id={id} ref={id}>
      <option value="" selected disabled>Select Disgnosis</option>
        {options}
      </select>
    )
  }

, renderRadioInlines: function(id, label, kwargs) {
    var radios = kwargs.values.map(function(value) {
      var defaultChecked = (value == kwargs.defaultCheckedValue)
      return <label className="radio-inline">
        <input type="radio" ref={id + value} name={id} value={value} defaultChecked={defaultChecked}/>
        {value}
      </label>
    })
    return this.renderField(id, label, radios)
  }

, renderField: function(id, label, field) {
    return <div className={$c('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
  }
})

//React.renderComponent(<Example company="FakeCo"/>, document.getElementById('example'))

// Utils

var trim = function() {
  var TRIM_RE = /^\s+|\s+$/g
  return function trim(string) {
    return string.replace(TRIM_RE, '')
  }
}()

function $c(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}


React.render(<Example company="FakeCo"/>, document.getElementById('example'));