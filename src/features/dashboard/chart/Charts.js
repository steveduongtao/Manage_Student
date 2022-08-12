import { CCard, CCardBody } from '@coreui/react';
import { CChart, CChartBar, CChartDoughnut } from '@coreui/react-chartjs';
import { Grid, Typography } from '@material-ui/core';
// import { DocsCallout } from 'src/components';

const Charts = ({ statistics, rankingByCityList }) => {
  const studentCountInCity = (cityName) => {
    return statistics.studentCountByCityList.filter((student) => {
      return cityName == student.city;
    }).length;
  };

  return (
    <>
      <Grid container spacing={3}>
        {/* Char1-pie-donut */}
        <Grid item xs={12} md={6} lg={2} xl={2}>
          <CCard className="mb-4">
            <Typography variant="h6">Rate male/female:</Typography>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: ['Male', 'Female'],
                  datasets: [
                    {
                      backgroundColor: ['#73ede7', '#18366a'],
                      data: [statistics.femaleCount, statistics.maleCount],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={4}>
          <CCard className="mb-4">
            <Typography variant="h6">Tỷ lệ thí sinh từng tỉnh:</Typography>
            <CCardBody>
              <CChartBar
                data={{
                  labels: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Phan Thiết'],
                  datasets: [
                    {
                      label: `Tổng số lượng học sinh: ${statistics.studentCountByCityList.length}`,
                      backgroundColor: '#18366a',
                      data: [studentCountInCity('hcm'), studentCountInCity('hn'), studentCountInCity('dn'), studentCountInCity('pt')],
                    },
                  ],
                  options: {},
                }}
                labels="cities"
              />
            </CCardBody>
          </CCard>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={4}>
          <Typography variant="h6">Tỷ lệ thí sinh từng tỉnh:</Typography>

          <CChart
            type="line"
            data={{
              labels: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Phan Thiết'],
              datasets: [
                {
                  label: 'Students/City',
                  backgroundColor: 'rgba(220, 220, 220, 0.2)',
                  borderColor: 'rgba(220, 220, 220, 1)',
                  pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                  pointBorderColor: '#fff',
                  data: [studentCountInCity('hcm'), studentCountInCity('hn'), studentCountInCity('dn'), studentCountInCity('pt')],
                },
                {
                  label: 'Highest Student mark/city',
                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                  borderColor: 'rgba(151, 187, 205, 1)',
                  pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                  pointBorderColor: '#fff',
                  data: [
                    rankingByCityList[0]?.rankingList[0].mark,
                    rankingByCityList[1]?.rankingList[0].mark,
                    rankingByCityList[2]?.rankingList[0].mark,
                    rankingByCityList[3]?.rankingList[0].mark,
                  ],
                },

                {
                  label: 'Male/City',
                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                  borderColor: 'violet',
                  pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                  pointBorderColor: '#fff',
                  data: [statistics.maleHcm, statistics.maleHn, statistics.maleDn, statistics.malePt],
                },
                {
                  label: 'Female/City',
                  backgroundColor: 'rgba(151, 187, 205, 0.2)',
                  borderColor: 'green',
                  pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                  pointBorderColor: '#fff',
                  data: [statistics.femaleHcm, statistics.femaleHn, statistics.femaleDn, statistics.femalePt],
                },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={2} xl={2}>
          <CCard className="mb-4">
            <Typography variant="h6">Tỉ lệ học sinh đỗ:</Typography>
            <CCardBody>
              <CChartDoughnut
                data={{
                  labels: ['Mark>=8', 'Mark<=5', '5<Mark<8'],
                  datasets: [
                    {
                      backgroundColor: ['#18366a', '#73ede7', '#3e8bab'],
                      data: [
                        statistics.highMarkCount,
                        statistics.lowMarkCount,
                        statistics.studentCountByCityList.length - (statistics.highMarkCount + statistics.lowMarkCount),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Charts;
