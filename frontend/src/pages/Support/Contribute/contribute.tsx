import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './contribute.css';
import Ayush from '../../../assets/contributor/ayush.jpg';
import Rohit from '../../../assets/contributor/rohit.jpg';
import Piyush from '../../../assets/contributor/piyush.jpg';
import Sidhant from '../../../assets/contributor/sidhant.jpg';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		rootm: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
);

function Contribute() {
	const classes = useStyles();
	function FormRow() {
		return (
			<React.Fragment>
				<Grid item xs={5}>
					<Card className={classes.rootm}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="170"
								src={Ayush}
								title="Ayush"
							/>
							<CardContent>
								<div className="hyu">Aayush Bahuguna</div>
								<div className="hy">(B.Tech/CSE/2013)</div>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
				<Grid item xs={5}>
					<Card className={classes.rootm}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="170"
								src={Piyush}
								title="Piyush"
							/>
							<CardContent>
								<div className="hyu">Piyush Nahar</div>
								<div className="hy">(B.Tech/EE/2013)</div>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</React.Fragment>
		);
	}
	function FormRow2() {
		return (
			<React.Fragment>
				<Grid item xs={5}>
					<Card className={classes.rootm}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="170"
								src={Rohit}
								title="Ayush"
							/>
							<CardContent>
								<div className="hyu">Rohit Agarwal</div>
								<div className="hy">(B.Tech/CSE/2013)</div>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
				<Grid item xs={5}>
					<Card className={classes.rootm}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="170"
								src={Sidhant}
								title="Sidhant"
							/>
							<CardContent>
								<div className="hyu">Sidhant Duggal</div>
								<div className="hy">(B.Tech/EE/2013)</div>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</React.Fragment>
		);
	}
	return (
		<>
			<Container fixed className="contribute-container">
				<div className="contribute-body">
					<div className={classes.root}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<div className="contribute-head">
									<h1>
										Donate to IIT Ropar Alumni Association
									</h1>
									<hr />
								</div>
							</Grid>
							<div className="contribute-body-items">
								<Grid item xs={5}>
									<div className="hyy">
										The role of the different Alumni
										Associations in the world has been very
										pivotal for the development of their
										respective institutions. The core aim
										being – building connections! As an
										input from Alumni of different IITs,
										many people lose contact details of
										their batch-mates, juniors, and seniors,
										over a period of time after graduating.{' '}
										<br /> <br />
										The Alumni Association of IIT Ropar
										strives to give a structured approach to
										avoid this by maintaining your existing
										iitrpr ids, maintaining information
										database of all Alumni, organizing
										Alumni-Student meets and promoting
										Mentorship programmes.
										<br /> <br />
										The Alumni fund majorly contributes
										towards improving institute and hostel
										infrastructure, giving
										scholarships/awards, loan facility etc.
										The Association aims to constantly
										invest in such permanent assets of the
										institute, aiming for regular and
										rigorous development. The Association
										has already allocated some funds for
										Enactus and for a scholarship program
										for students visiting foreign countries
										for the conference.
									</div>
								</Grid>
								<Grid item xs={6}>
									<Grid item xs={9}>
										{' '}
										<div
											className="hyy"
											style={{ fontWeight: 500 }}
										>
											Top Contributors
											<hr />
										</div>
									</Grid>
									<Grid container spacing={1}>
										<Grid
											container
											item
											xs={12}
											spacing={3}
										>
											<FormRow />
										</Grid>
										<Grid
											container
											item
											xs={12}
											spacing={3}
										>
											<FormRow2 />
										</Grid>
									</Grid>
								</Grid>
							</div>
							<Grid item xs={10}>
								<br />{' '}
								<div
									className="hyy"
									style={{ fontWeight: 500 }}
								>
									To know more about how to contribute, raise
									a query in{' '}
									<a href="/about/contact">contact us</a> or
									email us at{' '}
									<a href="mailto:alumni@iitrpr.ac.in">
										alumni@iitrpr.ac.in
									</a>
									.{' '}
								</div>
							</Grid>
							<Grid item xs={3}></Grid>
						</Grid>
					</div>
				</div>
			</Container>
		</>
	);
}

export default Contribute;
