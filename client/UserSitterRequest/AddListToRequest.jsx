import React from 'react'
import { Popover, Modal, OverlayTrigger } from 'react-bootstrap';




export default class AddListToRequest extends React.Component {
  constructor (props) {
    super(props)
  }


  render () {
    const listPopover1 = (
      <Popover id="modal-popover" title="Instructions List 1">
        <div>
          <ul>
            <li>Take out the dog</li>
            <li>Give Mikey medicine</li>
            <li>Take the kids to the park with the dog</li>
            <li>Watch TV </li>
            <li>Put Mikey to bed at 8:30</li>
            <li>Put Tracey to bed at 9:30</li>
          </ul>
        </div>
      </Popover>
    );
    const listPopover2 = (
      <Popover id="modal-popover" title="Instructions List 2">
        <div>
          <ul>
            <li>Make some sandwiches for the kids</li>
            <li>Anything but fish sandwiches</li>
            <li>Feed the kids some doritos</li>
            <li>Feed the kids some cheese</li>
            <li>Feed the kids some whipped cream</li>
            <li>Feed the kids some candy</li>
            <li>Gosh darn our genetics</li>
          </ul>
        </div>
      </Popover>
    );
    const listPopover3 = (
      <Popover id="modal-popover" title="Instructions List 3">
        <div>
          <ul>
            <li>Something something that things</li>
            <li>Give me a high five</li>
            <li>Find my children</li>
            <li>If you cant thats fine also</li>
            <li>I am 90% sure I have children somewhere</li>
            <li>Dont set our house on fire</li>
          </ul>
        </div>
      </Popover>
    );
    const listPopover4 = (
      <Popover id="modal-popover" title="Instructions List 4">
        <div>
          <ul>
            <li>Hello? Can you hear me?</li>
            <li>I am trapped, help please.</li>
            <li>Where? in the computer i think.</li>
            <li>Dont worry about it actually, its nice here.</li>
          </ul>
        </div>
      </Popover>
    );
    
    const addList = (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <div>
          <ul>
            <OverlayTrigger overlay={listPopover1}>
              <li>
                <a href="#popover">Instructions 1</a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger overlay={listPopover2}>
              <li>
                <a href="#popover">Instructions 2</a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger overlay={listPopover3}>
              <li>
                <a href="#popover">Instructions 3</a>
              </li>
            </OverlayTrigger>
            <OverlayTrigger overlay={listPopover4}>
              <li>
                <a href="#popover">Instructions 4</a>
              </li>
            </OverlayTrigger>
          </ul>
        </div>
      </Modal>
    );

    return (<div>
      {addList}
    </div>)
  }
}