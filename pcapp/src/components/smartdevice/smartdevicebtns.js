const btninfos = [
	{
		cmd:{
			angle:45,
			direct:'L',
			turnovermode:0x41,//‘A’(0x41):单左 45 度循环
			turnovertime:120,
		},
		title:'120分钟45度单边循环左翻',
		image:'device-indi01.png',
		imagesel:'device-indi01-sel.png'
	},
	{
		cmd:{
			angle:45,
			direct:'R',
			turnovermode:0x42,//‘B’(0x42):单右 45 度循环
			turnovertime:120
		},
		title:'120分钟45度单边循环右翻',
		image:'device-indi02.png',
		imagesel:'device-indi02-sel.png'
	},
	{
		cmd:{
			angle:45,
			direct:'LR',
			turnovermode:0x44,//‘D’(0x44):双侧 45 度循环
			turnovertime:120
		},
		title:'120分钟45度左右循环翻',
		image:'device-indi03.png',
		imagesel:'device-indi03-sel.png'
	},
	{
		cmd:{
			angle:30,
			direct:'LR',
			turnovermode:0x43,//‘C’(0x43):双侧 30 度循环
			turnovertime:120
		},
		title:'120分钟30度左右循环翻',
		image:'device-indi04.png',
		imagesel:'device-indi04-sel.png'
	},
	{
		cmd:{
			angle:45,
			direct:'LR',
			turnovermode:0x44,//‘D’(0x44):双侧 45 度循环
			turnovertime:30
		},
		title:'30分钟45度左右循环翻',
		image:'device-indi05.png',
		imagesel:'device-indi05-sel.png'
	},
	{
		cmd:{
			angle:60,
			direct:'L',
			turnovermode:0x45,//‘E’(0x45):双侧 60 度循环
			turnovertime:30
		},
		title:'30分钟60度左右循环翻',
		image:'device-indi06.png',
		imagesel:'device-indi06-sel.png'
	},
	{
		cmd:{
			angle:30,
			direct:'LR',
			turnovermode:0x43,//‘C’(0x43):双侧 30 度循环
			turnovertime:60
		},
		title:'60分钟30度左右循环翻',
		image:'device-indi07.png',
		imagesel:'device-indi07-sel.png'
	},
	{
		cmd:{
			angle:45,
			direct:'L',
			turnovermode:0x44,//‘D’(0x44):双侧 45 度循环
			turnovertime:60
		},
		title:'60分钟45度左右循环翻',
		image:'device-indi08.png',
		imagesel:'device-indi08-sel.png'
	},
	{
		cmd:{
			angle:45,
			direct:'L',
			turnovermode:0x4B,//‘K’(0x4B):45 度自检
			turnovertime:5
		},
		title:'5分钟45度左右循环自检',
		image:'run-time.png',
		imagesel:'run-time-sel.png'
	},
	{
		cmd:{
			angle:0,
			direct:'S',
			turnovermode:0x53,//‘S’(0x53):停止
			turnovertime:0
		},
		title:'功能关',
		image:'fun_off.png',
		imagesel:'fun_off_sel.png'
	},
	{
		cmd:{
			angle:0,
			direct:'R',
			turnovermode:0x52,//‘R’(0x52):复位
			turnovertime:0
		},
		title:'复位',
		image:'reset.png',
		imagesel:'reset-sel.png'
	},
	{
		title:'电源关',
		image:'on-off.png',
		imagesel:'on-off.png'
	},
];

export default btninfos;
