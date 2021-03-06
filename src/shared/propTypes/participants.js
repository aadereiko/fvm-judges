import PropTypes from 'prop-types';

export const participantPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  nominations: PropTypes.shape({
    id: PropTypes.shape({
      photo: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          link: PropTypes.string,
        }),
      ),
    }),
  }),
});
