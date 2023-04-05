import styles from './Animation.module.scss';

const Animation = () => {
  return (
    <div>
      <h1>Landing</h1>
      <h2>One place to discover them all</h2>
      <div className={styles.imageContainer}>
        <img
          src="https://imgs.search.brave.com/UWQK14r8QB26YdTlVmwZS5Rew8TXRUP99QxltmCQ1mM/rs:fit:600:900:1/g:ce/aHR0cHM6Ly9zdGF0/aWMuY2luZW1hZ2lh/LnJvL2ltZy9yZXNp/emUvZGIvbW92aWUv/MDIvNjIvNjIvZHVu/ZS04NDMxNTZsLTYw/MHgwLXctYjE4MTYx/YmMuanBn"
          alt="Dune poster"
          className={styles.cover}
        />
        <img
          src="https://imgs.search.brave.com/6BV-TbAGQvWqFDtgUDTyTln03Ve_om3RHVoJkbjE-NA/rs:fit:460:690:1/g:ce/aHR0cHM6Ly9hLmx0/cmJ4ZC5jb20vcmVz/aXplZC9maWxtLXBv/c3Rlci81LzEvMi83/LzYvNTEyNzYtZnJh/bmstaGVyYmVydC1z/LWR1bmUtMC00NjAt/MC02OTAtY3JvcC5q/cGc_az1lYjRiMTE3/ZjA1"
          className={styles.cover}
        />
        <img
          src="https://imgs.search.brave.com/bwwpuG8PhXJ46rSq9cGim6mzytCyWENOt1TnLnKFDQI/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9pbWFn/ZS50bWRiLm9yZy90/L3Avb3JpZ2luYWwv/ZFhsczQ1YXBCOENa/RDdFMjZ3NFdRb1Zn/OFhMLmpwZw"
          alt="Dune poster"
          className={styles.cover}
        />
        <img
          src="https://imgs.search.brave.com/ydTWPgl8pEBI7AVquIfah8uCNSJa4XvdIQo54SkOyjQ/rs:fit:1000:1200:1/g:ce/aHR0cHM6Ly9jZG4u/c2hvcnRwaXhlbC5h/aS9jbGllbnQvcV9s/cWlwLHJldF93YWl0/L2h0dHBzOi8vc2Np/ZmllbXBpcmUubmV0/L3dvcmRwcmVzcy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/MS9GcmFuay1IZXJi/ZXJ0cy1EdW5lLWdh/bWUtY292ZXIuanBn"
          alt="Dune poster"
          className={styles.coverSmall}
        />
        <img
          src="https://imgs.search.brave.com/0huPQCnD728sE16FLpywTNcxR4E3h0FN-nl3EEf7zDY/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9ob2Rk/ZXJzY2FwZS5jby51/ay93cC1jb250ZW50/L3VwbG9hZHMvMjAx/NS8wMi9EdS5qcGVn"
          alt="Dune poster"
          className={styles.coverSmall}
        />
        <img
          src="https://imgs.search.brave.com/iBfuXRnSJvZ4WjdqgIydftfZ3PMsgp9veMKC_pMi4WI/rs:fit:840:1200:1/g:ce/aHR0cHM6Ly9jZG4u/aG12LmNvbS9yL3ct/ODQwL2htdi9maWxl/cy83Mi83MjdmOTc5/ZC0zMmFmLTRkYTgt/OGZkYi05ODgxZTA3/MTIzNDYuanBn"
          alt="Dune poster"
          className={styles.coverSmall}
        />
        <img
          src="https://imgs.search.brave.com/06F6FdJtzpHe5clBlbCY_G5Ui-fcBQ3GCEVGfPL4I5I/rs:fit:326:500:1/g:ce/aHR0cHM6Ly9jZG4u/d2F0ZXJzdG9uZXMu/Y29tL2Jvb2tqYWNr/ZXRzL2xhcmdlLzk3/ODEvNDczMi85Nzgx/NDczMjMzODA1Lmpw/Zw"
          alt="Dune poster"
          className={styles.coverSmall}
        />
      </div>
    </div>
  );
};

export default Animation;
