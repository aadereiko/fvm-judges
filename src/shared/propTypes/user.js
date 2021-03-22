import PropTypes from 'prop-types';

export const userPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['judge', 'admin']),
  _id: PropTypes.string.isRequired,
});
