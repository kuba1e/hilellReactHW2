import {React, Component} from 'react'
import './ItemAddForm.css'

export default class ItemAddForm extends Component {
  state = {
    label: ''
  }

  onLabelChange = ({target})=>{
    this.setState({
      label: target.value
    })
  }

  render(){
    const {onAddItem} = this.props
    let {label}= this.state
    return (
      <form className='item-add-form d-flex' onSubmit={(event)=>{
        event.preventDefault()
        onAddItem(label)
        this.setState({label:''})
}}>
        <input className='form-control' type="text" onChange={this.onLabelChange} placeholder='What do you whant ot do?' value={label} required></input>
        <button className='btn btn-primary'>Add item</button>
      </form>
    )
  }
}