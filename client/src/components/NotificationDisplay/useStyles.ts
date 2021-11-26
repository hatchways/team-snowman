import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: theme.spacing(3.6),
    '& .MuiPopover-paper': { borderTop: '5px solid black' },
  },
  badge: {
    '& .MuiBadge-dot': { backgroundColor: '#1ec311 !important' },
  },
  link: {
    textDecoration: 'none',
  },
  point: {
    height: '10px',
    width: '10px',
    marginLeft: '-50%',
    marginTop: '43px',
    color: 'black',
  },
  pointClosed: {
    height: '10px',
    width: '10px',
    marginLeft: '-50%',
    marginTop: '43px',
    display: 'hidden',
  },
}));

export default useStyles;
