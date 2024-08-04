import CarouselCards from "../components/CarouselCards";
import CardContainer from "../components/IndustoryCards";
import IndustoryCard from "../components/IndustoryCards";
import JobCategories from "../components/JobCategories";
import Searchbar from "../components/Searchbar";

const cardData = [
    {
      image: 'https://media.istockphoto.com/id/1480239160/photo/an-analyst-uses-a-computer-and-dashboard-for-data-business-analysis-and-data-management.jpg?s=612x612&w=0&k=20&c=Zng3q0-BD8rEl0r6ZYZY0fbt2AWO9q_gC8lSrwCIgdk=',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'All Accountancy & Accounting',
      jobTitles: ['Accountant', 'Financial Analyst', 'Auditor'],
      location: 'New York, NY'
    },
    {
      image: 'https://media.istockphoto.com/id/1407200725/photo/close-up-of-businessman-using-a-laptop-with-graphs-and-charts-on-a-laptop-computer.jpg?s=612x612&w=0&k=20&c=rZLDjt03_qO7-wFEm_csy-FEChbipQvo5-a8md-uc4U=',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'Job Titles',
      jobTitles: ['Tax Accountant', 'Management Accountant', 'Bookkeeper'],
      location: 'Los Angeles, CA'
    },
    {
      image: 'https://picsum.photos/id/3/400/300',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'By location',
      jobTitles: ['Accounting Manager', 'Cost Accountant', 'Forensic Accountant'],
      location: 'Chicago, IL'
    },
    {
      image: 'https://picsum.photos/id/4/400/300',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'All Accountancy & Accounting',
      jobTitles: ['Financial Controller', 'Budget Analyst', 'Payroll Specialist'],
      location: 'Houston, TX'
    },
    {
      image: 'https://media.istockphoto.com/id/1182777182/photo/business-document-report-on-paper-and-tablet-with-sales-data-and-financial-business-growth.jpg?s=612x612&w=0&k=20&c=NundxRINazTarTCBDSbdoqORygFvbbAzIOc7-ubHIM8=',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'Job Titles',
      jobTitles: ['Accounts Receivable Clerk', 'Accounts Payable Clerk', 'Credit Analyst'],
      location: 'Phoenix, AZ'
    },
    {
      image: 'https://picsum.photos/id/6/400/300',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'By location',
      jobTitles: ['Internal Auditor', 'Financial Reporting Analyst', 'Treasury Analyst'],
      location: 'Philadelphia, PA'
    },
    {
      image: 'https://media.istockphoto.com/id/1455701949/photo/business-people-meeting-to-discuss-and-brainstorming-the-financial-report-paperwork-in-home.jpg?s=612x612&w=0&k=20&c=4aTNu6I6dwwX5jw2nmNxhbmUxBXJwZsLGYxpV4N4OXI=',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'All Accountancy & Accounting',
      jobTitles: ['Budget Manager', 'Accounting Supervisor', 'Tax Preparer'],
      location: 'San Antonio, TX'
    },
    {
      image: 'https://picsum.photos/id/8/400/300',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'Job Titles',
      jobTitles: ['Financial Reporting Manager', 'Cost Estimator', 'Accounts Receivable Manager'],
      location: 'San Diego, CA'
    },
    {
      image: 'https://media.istockphoto.com/id/1057509614/photo/business-people-working-on-marketing-plan-double-exposure.jpg?s=612x612&w=0&k=20&c=Th-ow00RbnGu71hFoJLWivVR5qhRyXa4Mn6kWbTXRco=',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'By location',
      jobTitles: ['Payroll Manager', 'Accounts Payable Supervisor', 'Financial Analyst'],
      location: 'Dallas, TX'
    },
    {
      image: 'https://picsum.photos/id/10/400/300',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'All Accountancy & Accounting',
      jobTitles: ['Accounting Clerk', 'Budget Analyst', 'Tax Accountant'],
      location: 'San Jose, CA'
    },
    {
      image: 'https://media.istockphoto.com/id/1431694821/photo/investors-working-on-desk-office-and-check-data-cost-balance-profit-and-currency-on-monitor.jpg?s=612x612&w=0&k=20&c=JDWZLzE3plhA8wKQcRAWnnZTU7Xk6wqqYFicSyII0hc=',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'Job Titles',
      jobTitles: ['Accounts Receivable Specialist', 'Cost Accountant', 'Financial Reporting Analyst'],
      location: 'Austin, TX'
    },
    {
      image: 'https://picsum.photos/id/12/400/300',
      title: 'Accountancy & Accounting Jobs',
      subTitle: 'By location',
      jobTitles: ['Payroll Clerk', 'Accounts Payable Clerk', 'Financial Analyst'],
      location: 'Fort Worth, TX'
    }
  ];
  

export default function SearchJob() {
    return (
        <div>
         <p  className="text-gray-200 py-1 text-sm bg-[#002244] text-center font-medium" >Search 156,089 jobs from 10,070 companies</p>
         <Searchbar />
         <CarouselCards />
         <CardContainer cardData={cardData}  />
         <JobCategories />
        </div>
    )
}