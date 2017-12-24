import { closeModal, openResourcesModal } from '../../actions/modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { selectSnippet, selectSolution } from '../../actions/editor';
import shortid from 'shortid';

class MenuMap extends Component {
  selectSeed = ({ currentTarget: { id }}) => {
    this.props.selectSnippet(id);
  }
  selectSolution = (e) => {
    e.stopPropagation();
    this.props.selectSolution(e.target.id);
  }
  renderModal = (e) => {
    e.stopPropagation();
    const modalId = e.target.id.slice(7).replace(/_/g, ' ');
    if (this.props.modalId === modalId && this.props.renderModal) {
      this.props.closeModal();
    } else {
      this.props.openResourcesModal(modalId);
    }
  }
  renderMenuItem = (item) => {
    const bgColor = item.title.replace(/\s/g, '') === this.props.codeId
      ? 'rgba(39, 145, 152, 0.52)'
      : '#707070';
    return (
      <div
        style={ { background: bgColor } }
        className={`sidebar--menu--detail ${ this.props.xtraClass }`}
        id={item.title.replace(/\s/g, '')}
        key={shortid.generate()}
        onClick={this.selectSeed}>
        <span>
          {item.title}
        </span>
        { !/Benchmarks/.test(item.title) &&
        <div className="sidebar--menu--detail--button--container">
          <span
            className="sidebar--menu--detail--button solution"
            id={`SOLUTION__${ item.title.replace(/\s/g, '') }`}
            onClick={this.selectSolution}>
            Solution
          </span>
          <span
            id={`MODAL__${ item.title.replace(/\s/g, '_') }`}
            className="sidebar--menu--detail--button resources modal-trigger"
            onClick={this.renderModal}>
            Resources
          </span>
        </div> }
      </div>
    );
  }
  render() {
    return (
      <details open>
        <summary className="sidebar--menu--sub-header">
          {this.props.header}
        </summary>
        {this.props.items.map(this.renderMenuItem)}
      </details>
    );
  }
};

MenuMap.propTypes = {
  closeModal: PropTypes.func.isRequired,
  codeId: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  modalId: PropTypes.string.isRequired,
  openResourcesModal: PropTypes.func.isRequired,
  renderModal: PropTypes.bool.isRequired,
  selectSnippet: PropTypes.func.isRequired,
  selectSolution: PropTypes.func.isRequired,
  xtraClass: PropTypes.string,
}

MenuMap.defaultProps = {
  xtraClass: ''
}

const mapStateToProps = (state) => {
  return {
    modalId: state.modal.modalId,
    renderModal: state.modal.renderModal,
    codeId: state.editor.current.id
  }
}

const mapDispatchToProps = {
  selectSnippet,
  selectSolution,
  openResourcesModal,
  closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuMap);
