import PropTypes from 'prop-types';

export const photoPropType = PropTypes.shape({
  mark: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  participantId: PropTypes.number,
});
