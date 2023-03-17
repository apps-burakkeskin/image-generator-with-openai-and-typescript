import * as React from 'react';
import { Configuration, OpenAIApi } from "openai";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


// API Key
const configuration = new Configuration({
    apiKey: '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',
});

// OpenAI API
const openai = new OpenAIApi(configuration);

// Dialog Transition
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageGenerator() {

  // Theme
  const theme = createTheme();

  theme.typography.h3 = {
    color: '#000000',
    fontSize: '2.4rem',
  };

  // Inputs
  const [userPrompt, setUserPrompt] = React.useState<any>("An armchair in the shape of an avocado");
  const [amount, setAmount] = React.useState<any>(9);
  const [size, setSize] = React.useState<any>('256x256');
  const [itemData, setItemData] = React.useState<any>([
    {
        url: '/images/1.png',
    },
    {
        url: '/images/2.png',
    },
    {
        url: '/images/3.png',
    },
    {
        url: '/images/4.png',
    },
    {
        url: '/images/5.png',
    },
    {
        url: '/images/6.png',
    },
    {
        url: '/images/7.png',
    },
    {
        url: '/images/8.png',
    },
    {
        url: '/images/9.png',
    }
  ]);

  // Generate Image
  const generateImage = async () => {
    try {
        const imageParameters: any = {
            prompt: userPrompt,
            n: parseInt(amount),
            size: size,
        };
        const response: any = await openai.createImage(imageParameters);
        const urlData = response.data.data;
        setItemData(urlData);
    } catch (error) {
        handleClickOpen();
        setbackDropOpen(false);
    }
  };

  // Backdrop
  const [backDropOpen, setbackDropOpen] = React.useState(false);
  const handleBackdrop = () => {
    setbackDropOpen(true);
    generateImage();
  };

  // useEffect
  React.useEffect(() => {
    setbackDropOpen(false);
  }, [itemData]);

  // setSize
  const handleSizeChange = () => {
    const size = (document.getElementById('uncontrolled-native') as HTMLInputElement).value;
    setSize(size);
  };

  // setAmount
  const handleAmountChange = () => {
    const amount = (document.getElementById('uncontrolled-native') as HTMLInputElement).value;
    setAmount(amount);
  };

  // Dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  return (
    <ThemeProvider theme={theme}>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"We're sorry, an issue has occurred!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            1. Please try entering your API KEY! <br />
            2. You may need to pay for your API KEY!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>OK</Button>
        </DialogActions>
      </Dialog>

        <Backdrop
            sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={ backDropOpen }
            onClick={ handleBackdrop }
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        
        <Typography variant="h3">OpenAI Image Generator</Typography>

        <Box
        component="form"
        sx={{ '& .MuiTextField-root': { mt: 5, width: '440px' }, }}
        noValidate
        autoComplete="off"
        >
            <TextField
            error={false}
            id="outlined-error"
            label="Start with a detailed description"
            defaultValue={ userPrompt }
            onChange={ (e) => setUserPrompt(e.target.value) }
            variant="outlined"
            multiline
            rows={4}
            />

            <Stack direction="row" spacing={2} sx={{ mt: 1, justifyContent: 'right' }}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Size
                    </InputLabel>
                    <NativeSelect
                    defaultValue={'256x256'}
                    onChange={handleSizeChange}
                    inputProps={{
                        name: 'size',
                        id: 'uncontrolled-native',
                    }}
                    >
                    <option value={'256x256'}>Small - 256px</option>
                    <option value={'512x512'}>Medium - 512px</option>
                    <option value={'1024x1024'}>Large - 1024px</option>
                    </NativeSelect>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native-amount">
                    Amount
                    </InputLabel>
                    <NativeSelect
                    defaultValue={'256x256'}
                    onChange={handleAmountChange}
                    inputProps={{
                        name: 'amount',
                        id: 'uncontrolled-native-amount',
                    }}
                    >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                    <option value={24}>24</option>
                    <option value={30}>30</option>
                    <option value={36}>36</option>
                    </NativeSelect>
                </FormControl>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 1, justifyContent: 'right' }}>
                <Button variant="outlined" sx={{ color: '#000000', borderColor: '#000000', textTransform: 'none' }} onClick={handleBackdrop}>Generate</Button>
            </Stack>
        </Box>

        <ImageList sx={{ width: 440, height: 'auto' }} cols={3} rowHeight={164}>
        {itemData && itemData.map((item: { url: any; }) => (
            <a href={item.url} target="_blank" rel="noreferrer">
                <ImageListItem key={item.url}>
                <img src={ item.url } loading="lazy" alt="Name" />
                </ImageListItem>
            </a>
        ))}
        </ImageList>

    </ThemeProvider>
  );
}