<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Produit
 *
 * @ORM\Table(name="produit")
 * @ORM\Entity
 */
class Produit
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_produit", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="produit_id_produit_seq", allocationSize=1, initialValue=1)
     */
    private $idProduit;

    /**
     * @var string|null
     *
     * @ORM\Column(name="marque", type="string", length=100, nullable=true)
     */
    private $marque;

    /**
     * @var string|null
     *
     * @ORM\Column(name="modele", type="string", length=100, nullable=true)
     */
    private $modele;

    /**
     * @var int|null
     *
     * @ORM\Column(name="prix", type="integer", nullable=true)
     */
    private $prix;


    /**
     * Get idProduit.
     *
     * @return int
     */
    public function getIdProduit()
    {
        return $this->idProduit;
    }

    /**
     * Set marque.
     *
     * @param string|null $marque
     *
     * @return Produit
     */
    public function setMarque($marque = null)
    {
        $this->marque = $marque;

        return $this;
    }

    /**
     * Get marque.
     *
     * @return string|null
     */
    public function getMarque()
    {
        return $this->marque;
    }

    /**
     * Set modele.
     *
     * @param string|null $modele
     *
     * @return Produit
     */
    public function setModele($modele = null)
    {
        $this->modele = $modele;

        return $this;
    }

    /**
     * Get modele.
     *
     * @return string|null
     */
    public function getModele()
    {
        return $this->modele;
    }

    /**
     * Set prix.
     *
     * @param int|null $prix
     *
     * @return Produit
     */
    public function setPrix($prix = null)
    {
        $this->prix = $prix;

        return $this;
    }

    /**
     * Get prix.
     *
     * @return int|null
     */
    public function getPrix()
    {
        return $this->prix;
    }
    /**
     * @var string|null
     *
     * @ORM\Column(name="email", type="string", length=200, nullable=true)
     */
    private $email;


    /**
     * Set email.
     *
     * @param string|null $email
     *
     * @return Produit
     */
    public function setEmail($email = null)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string|null
     */
    public function getEmail()
    {
        return $this->email;
    }
}
