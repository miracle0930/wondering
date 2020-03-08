import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { simpleActionCreator, middlewaredActionCreator } from '../../../redux/actions/DevActionCreator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PrimaryButton from '../../../components/buttons/primary/PrimaryButton';


const ReduxHook = (props) => {

  const dev = useSelector(state => state.dev);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(dev.testRes);
  }, [dev])

  const bindMiddlewared = useCallback(() => {

  })

  const onSimpleClicked = async () => {
    dispatch(simpleActionCreator('simple clicked'));
  }

  const onMiddlewaredClicked = async () => {

    // regular way to trigger async action creators when order matters
    // await props.actions.middlewaredActionCreator('1');
    // await props.actions.middlewaredActionCreator('2');

    //
    // dispatch(middlewaredActionCreator('3'));
    // dispatch(middlewaredActionCreator('4'));
  }



  return (
    <div style={{ padding: '20px' }}>

      <PrimaryButton
        title={'simple dispatch'}
        onClick={onSimpleClicked}
      />
      <PrimaryButton
        title={'middlewared'}
        onClick={onMiddlewaredClicked}
      />
      
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, {
    simpleActionCreator,
    middlewaredActionCreator
  }), dispatch)
})

export default connect(null, mapDispatchToProps)(ReduxHook);