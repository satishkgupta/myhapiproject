/** @jsx React.DOM */

var LOCALITY = [
  'Wakad (Pune)', 'Hinjewadi (Pune)', 'Pimple Saudagar (Pune)'
]

var DIAGNOSIS = [
  'Frozen shoulder', 'Parkinson`s disease', 'Pimple Saudagar (Pune)', 'ACL Repair', 'Others'
]

var APPT = [
  '12-June-2015, 9.00 am', '12-June-2015, 11.00 am', '12-June-2015, 01.00 pm', '12-June-2015, 03.00 pm', '12-June-2015, 05.00 pm'
]

var Example = React.createClass({
  getInitialState: function() {
    return {
      email: false
    , question: false
    , submitted: null
    }
  }

, render: function() {
    var submitted
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p>ContactForm data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }

    return <div>
      <div className="panel panel-default">
        <div className="panel-heading clearfix">
          <h3 className="panel-title pull-left">Quick Schedule</h3>
          <div className="pull-right">
            <label className="checkbox-inline">
              <input type="checkbox"
                checked={this.state.email}
                onChange={this.handleChange.bind(this, 'email')}
              /> Email
            </label>
            <label className="checkbox-inline">
              <input type="checkbox"
                checked={this.state.question}
                onChange={this.handleChange.bind(this, 'question')}
              /> Question
            </label>
          </div>
        </div>
        <div className="panel-body">
          <ContactForm ref="contactForm"
            email={this.state.email}
            question={this.state.question}
            company={this.props.company}
          />
        </div>
        <div className="panel-footer">
          <button type="button" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
      {submitted}
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
    var fields = ['name', 'phoneNumber', 'address', 'state', 'diagnosis','appt']
    if (this.props.email) fields.push('email')
    if (this.props.question) fields.push('question')

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
      firstName: this.refs.name.getDOMNode().value
    , phoneNumber: this.refs.phoneNumber.getDOMNode().value
    , appt: this.refs.appt.getDOMNode().value
    , locality: this.refs.locality.getDOMNode().value
    , diagnosis: this.refs.diagnosis.getDOMNode().value
    , address: this.refs.address.getDOMNode().value
    }
    if (this.props.email) data.email = this.refs.email.getDOMNode().value
    if (this.props.question) data.question = this.refs.question.getDOMNode().value
    return data
  }

, render: function() {
    return <div className="form-horizontal">
      {this.renderTextInput('name', 'Name *')}
      {this.renderTextInput('phoneNumber', 'Phone number *')}
      {this.renderSelect('appt', 'Appt', APPT)}
      {this.renderSelect('locality', 'Locality *', LOCALITY)}
      {this.renderSelect('diagnosis', 'Diagnosis', DIAGNOSIS)}
      {this.renderTextInput('address', 'Address with Pin')}
      {this.props.email && this.renderTextInput('email', 'Email')}
      {this.props.question && this.renderTextarea('question', 'Question')}
    </div>
  }

, renderTextInput: function(id, label) {
    var ph = "Pleaes enter ".concat(id);
    return this.renderField(id, label,
      <input type="text" className="form-control"  placeholder={ph} id={id} ref={id}/>
    )
  }

, renderTextarea: function(id, label) {
    return this.renderField(id, label,
      <textarea className="form-control" id={id} ref={id}/>
    )
  }

, renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option value={value}>{value}</option>
    })
    return this.renderField(id, label,
      <select className="form-control" id={id} ref={id}>
        {options}
        <option value="" selected disabled>Please select</option>
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