// This is an uncontrolled React form, which is way simpler than the standard
// React form setup
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can often simply use browser form validation these days, and just get the
// form contents on submit (see example below).
//
// If you need more from your forms, consider using Formik
// https://github.com/jaredpalmer/formik

import React from 'react'

import {
  FormRow,
  Label,
  TopLabel,
  Input,
  Button,
} from '../../styles/forms'

class PostForm extends React.Component {

  state = {
    disabled: false,
    listType: "rank",
    rows: [
      {"rank": "one", "list": "a"},
      {"rank": "two", "list": "b"},
      {"rank": "three", "list": "c"},
      {"rank": "four", "list": "d"},
      {"rank": "five", "list": "e"},
    ],
  }

  submit = event => {
    event.preventDefault()

    this.setState({
      disabled: true,
    })

    const {title, one, two, three, four, five} = event.target.elements

    // determines structure of firestore 'posts' collection
    const values = {
      title: title.value,
      one: one.value,
      two: two.value,
      three: three.value,
      four: four.value,
      five: five.value,
      // createdBy
      //  createdOn
    }

    this.props.onSubmit(values).then(() => {
      this.setState({
        disabled: false,
      })
    })
  }

  changeListType = event => {
    event.preventDefault();
    if (this.state.listType === "rank") {
      // change to unordered list
      this.setState({
        listType: "list"
      });
    } else if (this.state.listType === "list") {
      this.setState({
        listType: "rank"
      });
    }
  }

  render() {
    return <form onSubmit={this.submit}>


      <FormRow>
        {/* <div style={{display: "flex"}}>
          <Button style={{border: "none"}} onClick={this.changeListType}>{this.state.listType === "rank" ? "Ranking" : "List"}</Button>
          <TopLabel style={{paddingTop: "1.25%", fontSize: "16px"}} for="title">Name</TopLabel>
        </div> */}
        <Button onClick={this.changeListType}>{this.state.listType === "rank" ? "Ranking" : "List"}</Button>
        <TopLabel for="title">{this.state.listType === "rank" ? "Ranking Name" : "List Name"}</TopLabel>
        <Input type="text" name="title" defaultValue={(this.props.post && this.props.post.title) || ''} required />
      </FormRow>

      {this.state.rows.map((row, idx) => {
        return (
          <FormRow key={idx}>
            <Label for={row.rank}>{this.state.listType === "rank" ? `${idx + 1})` : `${row.list})`}</Label>
            <Input type="text" name={row.rank} defaultValue={(this.props.post && this.props.post[`${row.rank}`]) || ''} required />
          </FormRow>
        )
      })}

      {/* <FormRow>
        <Label for="one">1) </Label>
        <Input type="text" name="one" defaultValue={(this.props.post && this.props.post.one) || ''} required />
      </FormRow>

      <FormRow>
        <Label for="two">2) </Label>
        <Input type="text" name="two" defaultValue={(this.props.post && this.props.post.two) || ''} required />
      </FormRow>

      <FormRow>
        <Label for="three">3) </Label>
        <Input type="text" name="three" defaultValue={(this.props.post && this.props.post.three) || ''} required />
      </FormRow>

      <FormRow>
        <Label for="four">4) </Label>
        <Input type="text" name="four" defaultValue={(this.props.post && this.props.post.four) || ''} required />
      </FormRow>

      <FormRow>
        <Label for="five">5) </Label>
        <Input type="text" name="five" defaultValue={(this.props.post && this.props.post.five) || ''} required />
      </FormRow> */}


      <Button type="submit" disabled={this.state.disabled}>Submit</Button>

    </form>
  }
}

export default PostForm
